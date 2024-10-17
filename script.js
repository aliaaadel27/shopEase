document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('error-message');

    // Only add event listener if the form exists
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Password validation
            if (password !== confirmPassword) {
                errorMessage.textContent = "Passwords do not match!";
                return;
            }
            let users = JSON.parse(localStorage.getItem('users')) || [];
            // Check if the email is already registered
            if (users.some(user => user.email === email)) {
                errorMessage.textContent = "Email is already registered!";
                return;
            }
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            window.location.href = 'index.html';
        });
    }
});

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === "" || password === "") {
        errorMessage.innerText = "Both fields are required.";
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        window.location.href = "welcome.html";
    } else {
        errorMessage.innerText = "Invalid email or password.";
    }
}

window.onload = function () {
    if (window.location.pathname.includes('welcome.html')) {
        const userName = localStorage.getItem("userName"); 
        if (userName) {
            document.getElementById("welcome-message").innerText = `Welcome, ${userName}!`;
        } else {
            window.location.href = "index.html";
        }
    }

    if (window.location.href.includes('homePage.html')) {
        const userName = localStorage.getItem("userName"); 
        if (!userName) {
            window.location.href = "index.html"; 
        }
    }
};


function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "index.html";
}

function viewProducts() {
    window.location.href = "homePage.html";
}
