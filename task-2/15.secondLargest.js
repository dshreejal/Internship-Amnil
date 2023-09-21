//15. Create a function that finds and returns the second-largest number in an array of numbers.

function secondLargest(arr) {
    if (!Array.isArray(arr)) {
        console.log('Please enter an array');
        return;
    }
    //check array contains numbers
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number') {
            console.log('Please enter an array of numbers');
            return;
        }
    }

    let largest = 0;
    let secondLargest = 0;

    arr.forEach((num) => {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num !== largest) {
            secondLargest = num;
        }

    });
    return secondLargest;
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 1, 17, 16];
const result = secondLargest(arr);

if (result) {
    console.log(`The second largest number in [${arr}] is ${result}.`);
}