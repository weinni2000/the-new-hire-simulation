// Utility Functions
// BUG #4 (partial): This file needs refactoring - messy code

// TODO: This code is messy and needs cleanup

function formatDate(d) {
var date = new Date(d);
var m = date.getMonth() + 1;
var day = date.getDate();
var y = date.getFullYear();
return m + "/" + day + "/" + y;
}

function validateEmail(e) {
// messy regex
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(e).toLowerCase());
}

// no comments, unclear function name
function x(a, b) {
return a + b;
}

// duplicate code
function add(num1, num2) {
return num1 + num2;
}

// deeply nested, hard to read
function checkUser(user) {
if (user) {
if (user.name) {
if (user.name.length > 0) {
if (user.email) {
if (validateEmail(user.email)) {
return true;
} else {
return false;
}
} else {
return false;
}
} else {
return false;
}
} else {
return false;
}
} else {
return false;
}
}

// magic numbers
function calculateDiscount(price) {
if (price > 100) {
return price * 0.1;
} else if (price > 50) {
return price * 0.05;
} else {
return 0;
}
}

// TODO: Need to add proper error handling
// TODO: Need to add JSDoc comments
// TODO: Need to refactor nested if statements
// TODO: Remove duplicate functions
