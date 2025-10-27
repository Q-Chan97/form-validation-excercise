import "./styles.css"

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postcodeInput = document.getElementById("postcode");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("confirm");

function checkEmail(e) {
    const email = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email.value);
    console.log(isValid);

    if (!isValid) {
        emailInput.setCustomValidity("Must be a valid email (e.g. example@example.com).");
        console.log("Not Valid")
    }
    else {
        emailInput.setCustomValidity("");
        console.log("Valid")
    }
    emailInput.reportValidity();
}

emailInput.addEventListener("input", checkEmail);


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        console.log("Not a valid submission");
        return;
    }

    if (form.checkValidity()) {
        console.log("High five, dude!");
    }
})