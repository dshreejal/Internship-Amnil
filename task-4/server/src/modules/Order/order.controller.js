

const Order = require("../../models/Order.model");
const Cart = require("../../models/Cart.model");
const User = require("../../models/User.model");
const Product = require("../../models/Product.model");


exports.getOrders = async (req, res) => {
    const orders = await Order.find({}).populate("user").populate("products.product").select(["-__v", "-updatedAt"]);
    res.status(200).send(orders);
}

exports.getOneOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user").populate("products.product");
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.status(200).send(order);
}

exports.viewCart = async (req, res) => {
    const userId = req.params.id;
    const cart = await Cart.findOne({ user_id: userId }).populate("products.product");
    if (!cart) {
        return res.status(404).send('Cart not found');
    }
    res.status(200).send(cart);
}

exports.addToCart = async (req, res) => {
    const newCart = req.body;

    const userId = req.body.user;

    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(404).send('User not found');
    }

    const cartAlreadyPresent = await Cart.findOne({ user_id: userId });

    if (cartAlreadyPresent) {
        const products = cartAlreadyPresent.products;
        const newProducts = newCart.products;

        for (const newProduct of newProducts) {
            // Check if the product exists in the Product model
            const productDetails = await Product.findById(newProduct.product);
            if (!productDetails) {
                return res.status(404).send('Product not found');
            }

            // Check if the product quantity is greater than 0
            if (productDetails.quantity <= 0) {
                return res.status(400).send('Product quantity is not available');
            }

            const existingProductIndex = products.findIndex(product => product.product.equals(newProduct.product));

            if (existingProductIndex !== -1) {
                // Product already exists in the cart, update quantity and price
                products[existingProductIndex].quantity += newProduct.quantity;

                // Fetch the latest price from the Product model
                const productDetails = await Product.findById(newProduct.product);
                if (productDetails) {
                    // Calculate the new price based on the updated quantity and the latest price
                    products[existingProductIndex].price = products[existingProductIndex].quantity * productDetails.price;
                }

            } else {
                // Product is not in the cart
                const productDetails = await Product.findById(newProduct.product);
                if (!productDetails) {
                    return res.status(404).send('Product not found');
                }

                // Check if the product quantity is greater than 0
                if (productDetails.quantity <= 0) {
                    return res.status(400).send('Product quantity is not available');
                }

                if (productDetails) {
                    // Calculate the price for the new product based on the product model
                    const newPrice = newProduct.quantity * productDetails.price;
                    products.push({
                        product: newProduct.product,
                        quantity: newProduct.quantity,
                        price: newPrice,
                    });
                }
            }
        }

        const total_price = products.reduce((acc, product) => acc + product.price, 0);

        const updatedCart = await Cart.findByIdAndUpdate(cartAlreadyPresent._id, { products: products, total_price }, { new: true });
        res.send(updatedCart);
    }
    else {
        const products = newCart.products;

        let newProducts = [];

        for (const product of products) {
            const productDetails = await Product.findById(product.product);

            if (!productDetails) {
                return res.status(404).send('Product not found');
            }

            // Check if the product quantity is greater than 0
            if (productDetails.quantity <= 0) {
                return res.status(400).send('Product quantity is not available');
            }

            const newProduct = {
                product: productDetails._id,
                quantity: product.quantity,
                price: productDetails.price * product.quantity
            }
            newProducts.push(newProduct);
        }

        newCart.products = newProducts;

        const total_price = newCart.products.reduce((acc, product) => acc + product.price, 0);

        const cartData = await Cart.create({
            user_id: userId,
            products: newCart.products,
            total_price
        });
        res.send(cartData)
    }

}

exports.checkout = async (req, res) => {
    const userId = req.params.userId;
    const cartId = req.params.cartId;

    const userCart = await Cart.findOne({ user_id: userId, _id: cartId });
    if (!userCart) {
        return res.status(404).send('Cart not found');
    }

    if (userCart.total_price < 1000) {
        return res.status(400).send('Minimum threshold for total price of an order is 1000');
    }

    //update the product quantity
    for (const product of userCart.products) {
        const productDetails = await Product.findById(product.product);
        if (productDetails) {
            productDetails.quantity -= product.quantity;
            if (productDetails.quantity < 0) {
                return res.status(400).send('Product quantity is not available');
            }
            await Product.findByIdAndUpdate(product.product, { quantity: productDetails.quantity });
        }
        else {
            return res.status(404).send('Product not found');
        }
    }

    const order = await Order.create({
        user: userId,
        products: userCart.products,
        total_price: userCart.total_price
    });

    //delete the cart
    await Cart.findOneAndDelete({ user_id: userId, _id: cartId });

    //add order Id to user document
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.send(order);
}

exports.aggregatedOrder = async (req, res) => {

    // const aggregateQuery = [
    //     {
    //         $group: {
    //             _id: "$user",
    //             totalOrders: { $sum: 1 }
    //         }
    //     }
    // ];


    const aggregateQuery = [
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" },
                    year: { $year: "$createdAt" }
                },
                totalOrders: { $sum: 1 },
                totalPrice: { $sum: "$total_price" }
            }
        }
    ];

    const aggregateOrder = await Order.aggregate(aggregateQuery);

    if (aggregateOrder) {
        return res.status(200).json({ order: aggregateOrder, message: 'All orders fetched successfully!' });
    } else {
        return res.status(400).json({ message: 'Error fetching orders' });
    }
}