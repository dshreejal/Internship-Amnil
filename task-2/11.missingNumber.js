//11. Given an array containing n distinct numbers taken from 0 to n, find the missing number.

function missingNumber(array) {
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

    let sum = 0;
    let n = array.length;
    let expectedSum = (n * (n + 1)) / 2;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return expectedSum - sum;
}

const array = [0, 1, 3, 4, 5, 6, 7, 8, 9];
const result = missingNumber(array);

if (result !== undefined) {
    console.log(`The missing number in [${array}] is ${result}.`);
}




