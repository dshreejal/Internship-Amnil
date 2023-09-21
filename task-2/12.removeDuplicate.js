//12. Write a function that removes duplicate elements from an array.

function removeDuplicate(array) {

    if (!Array.isArray(array)) {
        console.log('Please enter an array');
        return;
    }

    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (!newArray.includes(array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

const array = [1, 2, 3, 9, 5, 6, 7, 8, 9, 1];
const result = removeDuplicate(array);

if (result) {
    console.log(`The array [${array}] without duplicate elements is [${result}].`);
}