//5. Write a program that prints numbers from 1 to 100. For multiples of 3, print "Fizz"; for multiples of 5, print "Buzz"; and for multiples of both 3 and 5, print "FizzBuzz".

function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        let output = '';
        if (i % 3 === 0) {
            output += 'Fizz';
        }
        if (i % 5 === 0) {
            output += 'Buzz';
        }
        console.log(output || i);
    }
}
fizzBuzz();