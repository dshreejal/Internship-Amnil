//4. Write a function that finds and returns the longest word in a sentence.

function longestWord(sentence) {
    if (typeof sentence !== 'string') {
        console.log('Please enter a sentence');
        return;
    }
    const words = sentence.split(' ');
    let longest = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}

const data = 'This is a task given during internship at Amnil Technologies';
const result = longestWord(data);

if (result !== undefined) {
    console.log(`The longest word in "${data}" is "${result}".`);
}