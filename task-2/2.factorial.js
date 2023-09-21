//2. Write a function to calculate the factorial of a given positive integer.

function factorial(n) {
    if (typeof n !== 'number') {
        console.log('Please enter a valid number');
        return;
    }
    if (n < 0) {
        return 'Please enter a positive integer';
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
const data = 5;
const result = factorial(data);
if (result !== undefined) {
    console.log(`The factorial of ${data} is ${result}`);
}
