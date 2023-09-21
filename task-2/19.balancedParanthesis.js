//19. Implement a function that checks if a string with brackets (e.g., "{[()]}" or "[(){}]") is balanced.

function isValid(s) {
    if (typeof s !== 'string') {
        console.log("Please enter a valid string with paranthesis.");
        return;
    }

    const regex = /[^{}()\[\]]/g;
    if (regex.test(s)) {
        console.log("Please enter a valid string with paranthesis.");
        return;
    }

    const n = s.length;
    const stack = [];
    let ans = true;

    for (let i = 0; i < n; i++) {
        if (s[i] === '{' || s[i] === '(' || s[i] === '[') {
            stack.push(s[i]);
        } else if (s[i] === ')') {
            if (stack.length > 0 && stack[stack.length - 1] === '(') {
                stack.pop();
            } else {
                ans = false;
                break;
            }
        } else if (s[i] === ']') {
            if (stack.length > 0 && stack[stack.length - 1] === '[') {
                stack.pop();
            } else {
                ans = false;
                break;
            }
        } else if (s[i] === '}') {
            if (stack.length > 0 && stack[stack.length - 1] === '{') {
                stack.pop();
            } else {
                ans = false;
                break;
            }
        }
    }

    if (stack.length > 0) {
        return false;
    }
    return ans;
}

const string = "{([])}";
const result = isValid(string);

if (result !== undefined) {
    if (result) {
        console.log(`The string ${string} has balanced paranthesis.`);
    } else {
        console.log(`The string ${string} does not have balanced paranthesis.`);
    }
}



