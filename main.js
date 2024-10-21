function showError(element, message) {
    element.innerHTML = message;     
    element.style.display = 'block';  
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.style.display = 'none';
    errorDisplay.innerHTML = '';

    let isValid = true;
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    if (username === '' || username.length < 4 || new Set(username).size < 2 || /[^a-zA-Z0-9]/.test(username)) {
        showError(errorDisplay, 'Username must be at least 4 characters, contain 2 unique characters, and have no special characters.');
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || email.endsWith('@example.com')) {
        showError(errorDisplay, 'Please enter a valid email address not from "example.com".');
        isValid = false;
    }

    if (password.length < 12 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password) || password.includes('password') || password.includes(username)) {
        showError(errorDisplay, 'Password must be 12 characters long, contain uppercase, lowercase, numbers, special characters, and not include "password" or your username.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError(errorDisplay, 'Passwords do not match.');
        isValid = false;
    }

    if (!terms) {
        showError(errorDisplay, 'You must accept the terms and conditions.');
        isValid = false;
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.username === username.toLowerCase())) {
            showError(errorDisplay, 'That username is already taken.');
        } else {
            users.push({ username: username.toLowerCase(), email: email.toLowerCase(), password });
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('registrationForm').reset(); 
        }
    }
});

