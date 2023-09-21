//16. Write a function that reverses the order of words in a sentence.

function reverseWords(str) {
    if (typeof str !== 'string') {
        console.log('Please enter a string');
        return;
    }

    const words = str.split(' ');
    let reversed = '';

    for (let i = words.length - 1; i >= 0; i--) {
        reversed += words[i] + ' ';
    }

    return reversed.trim();
}

const str = 'This is a string';
const result = reverseWords(str);

if (result) {
    console.log(`The reversed string is: ${result}`);
}
