// 8. Write a function that counts the number of vowels in a given string.

function countVowels(str) {
    if (typeof str !== 'string') {
        console.log('Please enter a string');
        return;
    }
    let count = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) {
            count++;
        }
    }
    return count;
}

const data = 'Hello Task 2';
const result = countVowels(data);

if (result !== undefined) {
    console.log(`The number of vowels in "${data}" is ${result}.`);
}