//6. Write a function that calculates the sum of all elements in an array.

function arraySum(array) {
    if (!Array.isArray(array)) {
        console.log('Please enter an array');
        return;
    }

    //Checking if the array contains all numbers or not
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
            console.log('Please enter an array of numbers');
            return;
        }
    }

    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const data = [1, 2, 3, 4, 5];
const result = arraySum(data);
if (result !== undefined) {
    console.log(`The sum of all elements in [${data}] is ${result}.`);
}
