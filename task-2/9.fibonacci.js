//9. Implement a function that generates the Fibonacci sequence up to a specified number of terms.

function fibonacci(n) {
    if (typeof n !== 'number') {
        console.log('Please enter a number');
        return;
    }

    if (n < 1) {
        console.log('Please enter a positive number');
        return;
    }

    if (n === 1) {
        return [0];
    }

    let fibonacciSequence = [0, 1];
    for (let i = 2; i < n; i++) {
        fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2]);
    }

    return fibonacciSequence;
}

const data = 6;
const result = fibonacci(data);
if (result !== undefined) {
    console.log(`The fibonacci sequence up to ${data} is [${result}].`);
}