//14. Write a function that merges two sorted arrays into a single sorted array.

function mergeSorted(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.log('Please enter two arrays');
        return;
    }

    //check array contains numbers
    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] !== 'number') {
            console.log('Please enter an array of numbers');
            return;
        }
    }

    for (let i = 0; i < arr2.length; i++) {
        if (typeof arr2[i] !== 'number') {
            console.log('Please enter an array of numbers');
            return;
        }
    }

    const merged = [...arr1, ...arr2];
    merged.sort((a, b) => a - b);
    return merged;
}

const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8, 10];
const result = mergeSorted(arr1, arr2);

if (result) {
    console.log(`The merged array is [${result}].`);
}