let token = ''; 
import { callWS } from '/client_js/callWS.js';

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
    let user_data = { username, password };

    callWS("http://localhost:300/signin", "signin", '', user_data).then(
        (data) => {
            console.log(data);
            token = data.token;
            window.location.href = 'LoginSuccess';
        }
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const eyeIcon = document.getElementById('eye-icon');
    const loginButton = document.querySelector('button[type="button"]');

    if (eyeIcon) {
        eyeIcon.addEventListener('click', togglePassword);
    }
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
});

export { handleLogin, togglePassword };
