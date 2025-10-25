import "./styles.css"

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postcodeInput = document.getElementById("postcode");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("confirm");



form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("High five, dude!");
})