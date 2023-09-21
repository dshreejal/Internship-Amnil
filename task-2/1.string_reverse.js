//1. Write a function to reverse a gievn string without using the built in 'reverse()' method

function strReverse(str) {
    if (typeof str !== 'string') {
        console.log("Please enter a valid string");
        return;
    }
    const length = str.length;
    let reverse = '';

    for (let i = length - 1; i >= 0; i--) {
        reverse = reverse + str[i];
    }

    console.log(`The string is: ${str}`);
    console.log("Its reverse is: ");
    console.log(reverse);
}

let string = 'Hello';

strReverse(string);
