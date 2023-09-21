// 7. Create a function that converts a sentence to title case (capitalize the first letter of each word).

function titleCase(str) {
    if (typeof str !== 'string') {
        console.log('Please enter a sentence');
        return;
    }
    let newStr = str.toLowerCase().split(' ');
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].substring(1);
    }
    return newStr.join(' ');
}

const data = 'This is a task given during internship at Amnil Technologies';
const result = titleCase(data);

if (result !== undefined) {
    console.log(`The title case of "${data}" is "${result}".`);
}
