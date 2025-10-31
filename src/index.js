import "./styles.css"

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postcodeInput = document.getElementById("postcode");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("confirm");

function checkEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(emailInput.value);
    console.log(isValid);

    if (emailInput.value === "") {
        emailInput.setCustomValidity("Email cannot be left empty.");
        console.log("Field empty")
    }

    else if (!isValid) {
        emailInput.setCustomValidity("Must be a valid email (e.g. example@example.com).");
        console.log("Not Valid")
    }

    else {
        emailInput.setCustomValidity("");
        console.log("Valid")
    }
    emailInput.reportValidity();
}

function checkPostalCode() {
    const country = countryInput.value;
    const postcodeValue = postcodeInput.value.trim();
    const constraints = { // Keys have two values: regex and error message
        usa: [
            /^\d{5}$/,
            "United States ZIP codes must be 5 numerical digits (e.g. 66062)",
        ],

        au: [
            /^\d{4}$/,
            "Australian postal codes must be 4 numerical digits (e.g. 2615)",
        ],

        jp: [
            /^\d{3}-\d{4}$/,
            "Japanese postal codes must be 7 numerical digits separated by a dash (e.g. 307-0001)",
        ],
    }

    if (!country || !constraints[country]) { // Guard against no country selection
        postcodeInput.setCustomValidity("Country must be selected");
    }
    if (postcodeValue === "") {
        postcodeInput.setCustomValidity("Cannot be left empty.")
    }

    const [pattern, message] = constraints[country]; // Array deconstruction, equivalent to const pattern = constraints[country][0] and const message = constraints[country][1]
    const isValid = pattern.test(postcodeValue); // Tests postcode value against regex test

    if (isValid) { // Clears if valid, shows message if not
        postcodeInput.setCustomValidity("");
    } 
    else {
        postcodeInput.setCustomValidity(message)
    }
    postcodeInput.reportValidity(); 
}

function checkPassword() {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const isValid = regex.test(passwordInput.value);
    const value = passwordInput.value;

    if (value === "") {
        passwordInput.setCustomValidity("Cannot be left blank");
    }

    if (!isValid) {
        passwordInput.setCustomValidity("Passwords must be at least 8 characters and have at least 1 capital letter, special character, and number.")
        console.log("Password not valid");
    }
    else {
        passwordInput.setCustomValidity("");
        console.log("Valid password");
    }
    passwordInput.reportValidity();
}

function checkConfirm() {
    if (passwordInput.value.trim() === passwordConfirmInput.value.trim()) {
        passwordConfirmInput.setCustomValidity("");
        console.log("Passwords match")
    }
    else {
        passwordConfirmInput.setCustomValidity("Passwords must match.")
        console.log("passwords don't match")
    }
    passwordConfirmInput.reportValidity();
}

emailInput.addEventListener("input", checkEmail);
countryInput.addEventListener("change", checkPostalCode); // Updates the regex rule changes on country change
postcodeInput.addEventListener("input", checkPostalCode); // Validates input
passwordInput.addEventListener("input", checkPassword);
passwordConfirmInput.addEventListener("input", checkConfirm);


form.addEventListener("submit", (e) => { // Run all checks on form submit, will stop if any field is invalid
    e.preventDefault();
    checkEmail();
    checkPostalCode();
    checkPassword();
    checkConfirm();

    if (!form.checkValidity()) {
        form.reportValidity();
        console.log("Not a valid submission");
        return;
    }

    if (form.checkValidity()) {
        console.log("High five, dude!");
    }
})