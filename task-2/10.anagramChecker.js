//10. Write a function that checks if two strings are anagrams of each other (contain the same letters, ignoring spaces and capitalization).

function anagramChecker(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        console.log('Please enter a string');
        return;
    }

    const newStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const newStr2 = str2.replace(/\s+/g, '').toLowerCase();

    if (newStr1.length !== newStr2.length) {
        return false;
    }

    const sortedStr1 = newStr1.split('').sort().join('');
    const sortedStr2 = newStr2.split('').sort().join('');

    return sortedStr1 === sortedStr2;
}


const str1 = "Listen";
const str2 = "silenT";
const result = anagramChecker(str1, str2);

if (result !== undefined) {
    if (result) {
        console.log(`The strings ${str1} and ${str2} are anagrams.`);
    }
    else {
        console.log(`The strings ${str1} and ${str2} are not anagrams.`);
    }
}
