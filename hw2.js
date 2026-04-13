/*
Name: Julian Siudmak
Date created: 3/25/2026
Date last edited: 3/25/2026
Version: 1.0
Description: JavaScript file for homework 2. Validates patient data 
*/



//  -- Dynamic date --
const d = new Date();
document.getElementById("today").innerHTML = d.toLocaleDateString();
 
 
// -- Pain-level slider --
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
if (slider && output) {
    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = this.value;
    };
}
 
 
// -- Review button --
function reviewInput() {
    var formcontent = document.getElementById("signup");
    if (!formcontent) return;
 
    var formoutput = "<table class='output'><tr><th colspan='2'>Review Your Information:</th></tr>";
 
    for (var i = 0; i < formcontent.elements.length; i++) {
        var el = formcontent.elements[i];
        var datatype = el.type;
        var name = el.name;
        var value = el.value;
 
        if (!name) continue;
 
        switch (datatype) {
            case "checkbox":
                if (el.checked) {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'>&#x2713;</td></tr>";
                }
                break;
            case "radio":
                if (el.checked) {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'>" + value + "</td></tr>";
                }
                break;
            case "range":
                formoutput += "<tr><td align='right'>Pain Level</td>";
                formoutput += "<td class='outputdata'>" + value + "</td></tr>";
                break;
            case "password":
                //  don't display passwords or SSN in review
                break;
            case "button":
            case "submit":
            case "reset":
                break;
            default:
                if (value !== "") {
                    formoutput += "<tr><td align='right'>" + name + "</td>";
                    formoutput += "<td class='outputdata'><span>" + value + "</span></td></tr>";
                }
        }
    }
 
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}
 
 
// -- Username --
function validateUsername() {
    let uid = document.getElementById("user").value.toLowerCase();
    document.getElementById("user").value = uid;
 
    if (uid.length === 0) {
        document.getElementById("username-error").innerHTML = "User ID can't be blank";
        return false;
    }
    if (!isNaN(uid.charAt(0))) {
        document.getElementById("username-error").innerHTML = "User ID can't start with a number";
        return false;
    }
    if (uid.length < 5) {
        document.getElementById("username-error").innerHTML = "User ID must be at least 5 characters";
        return false;
    }
    if (uid.length > 30) {
        document.getElementById("username-error").innerHTML = "User ID can't exceed 30 characters";
        return false;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(uid)) {
        document.getElementById("username-error").innerHTML = "Letters, numbers, underscores, and dashes only";
        return false;
    }
    document.getElementById("username-error").innerHTML = "";
    return true;
}
 
 
// -- Email --
var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
function validateEmail() {
    const email = document.getElementById("email").value;
    if (!emailR.test(email)) {
        document.getElementById("email-error").innerHTML = "Please enter a valid email address";
        return false;
    }
    document.getElementById("email-error").innerHTML = "";
    return true;
}
 
 
// -- Password --
function validatePassword() {
    const pass = document.getElementById("password").value;
    const username = document.getElementById("user").value;
    const msgs = ["msg1", "msg2", "msg3", "msg4"];
 
    const errors = [];
 
    if (!pass.match(/[a-z]/))          errors.push("At least one lowercase letter");
    if (!pass.match(/[A-Z]/))          errors.push("At least one uppercase letter");
    if (!pass.match(/[0-9]/))          errors.push("At least one number");
    if (!pass.match(/[!@#$%&*\-_\\.+()]/)) errors.push("At least one special character (!@#$%&*-_.+())");
    if (username && pass.includes(username)) errors.push("Password cannot contain your username");
 
    // DISPLAY MSG
    for (let i = 0; i < msgs.length; i++) {
        const el = document.getElementById(msgs[i]);
        if (el) el.innerHTML = errors[i] ? "⚠ " + errors[i] : "";
    }
 
    return errors.length === 0;
}
 
function confirmPass() {
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirm_pass").value;
 
    if (confirm.length === 0) {
        document.getElementById("confirm_pass-error").innerHTML = "";
        return;
    }
    if (pass !== confirm) {
        document.getElementById("confirm_pass-error").innerHTML = "Passwords do not match";
    } else {
        document.getElementById("confirm_pass-error").innerHTML = "✓ Passwords match";
    }
}
 
function checkPasswordMatch() {
    confirmPass();
}
 
 
// -- First name --
function validateFname() {
    const fname = document.getElementById("fname").value;
    if (fname.length === 0) {
        document.getElementById("fname-error").innerHTML = "First name can't be blank";
        return false;
    }
    if (!/^[a-zA-Z'\-]{1,30}$/.test(fname)) {
        document.getElementById("fname-error").innerHTML = "Letters, apostrophes, and dashes only";
        return false;
    }
    document.getElementById("fname-error").innerHTML = "";
    return true;
}
 
 
// -- Middle initial --
function validateMname() {
    const mname = document.getElementById("mname").value;
    if (mname.length === 0) {
        document.getElementById("mname-error").innerHTML = "";
        return true; // not required
    }
    if (!/^[a-zA-Z]$/.test(mname)) {
        document.getElementById("mname-error").innerHTML = "One letter only";
        return false;
    }
    document.getElementById("mname-error").innerHTML = "";
    return true;
}
 
 
// -- Last name --
function validateLname() {
    const lname = document.getElementById("lname").value;
    if (lname.length === 0) {
        document.getElementById("lname-error").innerHTML = "Last name can't be blank";
        return false;
    }
    if (!/^[a-zA-Z'\-]{1,30}$/.test(lname)) {
        document.getElementById("lname-error").innerHTML = "Letters, apostrophes, and dashes only";
        return false;
    }
    document.getElementById("lname-error").innerHTML = "";
    return true;
}
 
 
// -- DOB --
function validateDob() {
    const dob = document.getElementById("dob");
    const date = new Date(dob.value);
    const maxAge = new Date();
    maxAge.setFullYear(maxAge.getFullYear() - 120);
 
    if (!dob.value) {
        document.getElementById("dob-error").innerHTML = "Date of birth is required";
        return false;
    }
    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = "Date can't be in the future";
        dob.value = "";
        return false;
    }
    if (date < maxAge) {
        document.getElementById("dob-error").innerHTML = "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    }
    document.getElementById("dob-error").innerHTML = "";
    return true;
}
 
 
// -- SSN --
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
 
    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = "Please enter a valid SSN (e.g. 123-45-6789)";
        return false;
    }
    document.getElementById("ssn-error").innerHTML = "";
    return true;
}
 
 
// -- Phone --
function validatePhone() {
    const phone = document.getElementById("phone").value;
    const phoneR = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
 
    if (!phoneR.test(phone)) {
        document.getElementById("phone-error").innerHTML = "Please enter phone as 123-456-7890";
        return false;
    }
    document.getElementById("phone-error").innerHTML = "";
    return true;
}
 
 
// -- Address line 1 --
        function validateAddress1() {
                const addr = document.getElementById("address1").value;
                if (addr.length === 0) {
                document.getElementById("address1-error").innerHTML = "Address can't be blank";
                return false;
                 }
    document.getElementById("address1-error").innerHTML = "";
    return true;
}
 
 
// -- City --
function validateCity() {
    const city = document.getElementById("city").value;
    if (city.length === 0) {
        document.getElementById("city-error").innerHTML = "City can't be blank";
        return false;
    }
    if (!/^[a-zA-Z\s'\-]{1,30}$/.test(city)) {
        document.getElementById("city-error").innerHTML = "Letters only";
        return false;
    }
    document.getElementById("city-error").innerHTML = "";
    return true;
}
 
 
// -- Zip code --
function validateZip() {
    const zip = document.getElementById("zip").value;
    if (!/^[0-9]{5}$/.test(zip)) {
        document.getElementById("zip-error").innerHTML = "Please enter a valid 5-digit zip code";
        return false;
    }
    document.getElementById("zip-error").innerHTML = "";
    return true;
}
