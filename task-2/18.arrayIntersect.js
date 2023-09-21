//18. Write a function that finds the intersection (common elements) of two arrays.

function arrayIntersect(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.log('Please enter two arrays');
        return;
    }

    let result = [];

    for (let i = 0; i < arr1.length; i++) {

        if (arr2.includes(arr1[i])) {
            result.push(arr1[i]);
        }
    }

    return result;
}

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr2 = [2, 4, 6, 8, 10, 12, 14, 16];

const result = arrayIntersect(arr1, arr2);

if (result) {
    console.log(`The intersection of the two arrays is [${result}].`);
}