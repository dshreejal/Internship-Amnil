//17.   Implement a function that validates if a given string is a valid email address.

function validateEmail(email) {
    if (typeof email !== 'string') {
        console.log('Please enter a string');
        return;
    }

    //Regular expression for email validation. Preffered to use library to simplify the task and better validation.
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
}

const email = 'hello@hello.com'
const result = validateEmail(email);

if (result !== undefined) {
    if (result) {
        console.log(`The email is valid`);
    }
    else {
        console.log(`The email is invalid`);
    }

}