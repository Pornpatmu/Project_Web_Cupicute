// import { callWS } from '/client_js/callWS.js';
const callWS = require("/client_js/callWS.js");

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = '/images/Normal_page/hide.png';  
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = '/images/Normal_page/show.png';  
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('login-button');
    
    loginButton.disabled = true;

    let user_data = { username, password };

    callWS("http://localhost:3001/signin", "signin", '', user_data).then((data) => {
        console.log(data);
        if (data.token) {
            document.cookie = `token=${data.token}; path=/; max-age=3600; Secure; HttpOnly`;

            window.location.href = '/LoginSuccess'; 
        } else {
            alert("Login failed, please check your credentials.");
        }
    }).catch((error) => {
        console.error("Error during login", error);
    }).finally(() => {
        loginButton.disabled = false;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const eyeIcon = document.getElementById('eye-icon');
    const loginButton = document.getElementById('login-button');

    if (eyeIcon) {
        eyeIcon.addEventListener('click', togglePassword);  
    }
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);  
    }
});

export { togglePassword, handleLogin };

