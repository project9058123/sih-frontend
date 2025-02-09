document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.querySelector('button[type="submit"]');

    // Disable button to prevent multiple submissions
    loginButton.disabled = true;
    loginButton.innerText = "Logging in...";

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            sessionStorage.setItem('token', data.token); // Use sessionStorage for security
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            alert('Invalid credentials');
        }
    })
    .catch(error => {
        console.error("Login error:", error);
        alert("Error connecting to server. Please try again.");
    })
    .finally(() => {
        loginButton.disabled = false;
        loginButton.innerText = "Login";
    });
});
