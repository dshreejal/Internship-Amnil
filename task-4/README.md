# Task 4

Use MongoDB Database connection to perform the CRUD operations of [task-3](https://github.com/dshreejal/Internship-Amnil/tree/main/task-3)

Create a basic node express application and perform following operations:

Users:

- Create a json file for Users
- Create basic CRUD apis for users

Products:

- Create a json file for products.
- Products must have id, name, price, description, quantity, product_type
- Create basic CRUD APIs using meaning full request types (e.g. GET, POST, PUT, PATCH)
- Create an API to delete a product by its id
- Create an API to search among the products. Search by either name or description. Sort by price, filter by product_type (Product types might be Electronics, Grocery, Clothing, etc.)
- Create an API to update the product quantity
- Create an API to list all the out of stock products (i.e. quantity less than 5)

Orders:

- Create a new json file for tracking orders.
- Create an API to list order history
- Users should be able to add products to cart and order must be generated only upon checkout.
- Set a minimum threshold for total price of an order.

## Project Structure

The project consists of a backend server created using Express

- [server](https://github.com/dshreejal/Internship-Amnil/tree/main/task-4/server)

## Project Setup

Fork the repository and clone it (or download the zip file and extract it)

```bash
git clone git@github.com:dshreejal/Internship-Amnil.git
```

Change directory to the project directory

```bash
cd Internship-Amnil/task-3
```

Change directory to the server

```bash
cd server
```

Install the required dependencies

```bash
npm install
```

Add the necessary environment variables from .env.example file

```bash
PORT = 8000
MongoURL = 'mongodb://localhost:27017/'
```

Run the server

```bash
npm run start
```
