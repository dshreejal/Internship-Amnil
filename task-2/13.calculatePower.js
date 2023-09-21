//13. Implement a function that calculates x^n (x raised to the power of n) without using the `Math.pow()` method.

function calculatePower(x, n) {
    if (typeof x !== 'number' || typeof n !== 'number') {
        console.log('Please enter numbers');
        return;
    }
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}

const x = 2;
const n = 3;
const result = calculatePower(x, n);

if (result) {
    console.log(`${x} raised to the power of ${n} is ${result}.`);
}