//3. Create a function that checks if a given string is a palindrome (reads the same backward as forward).
function isPalindrome(str) {
    if (typeof str !== 'string') {
        console.log('Please enter a string');
        return;
    }

    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;

}
const data = 'bob'; //madam
const result = isPalindrome(data);

if (result) {
    console.log(`"${data}" is a palindrome.`);
}
else {
    console.log(`"${data}" is not a palindrome.`);
}

