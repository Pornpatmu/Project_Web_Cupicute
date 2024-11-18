import { callUserAdminWS } from "/client_js/callUserAdminWS.js";
import { getCookie } from '/client_js/getCookie.js';  

export function togglePassword() {
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

export async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');

    // ตรวจสอบว่าผู้ใช้กรอก username และ password หรือไม่
    if (!username || !password) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = "Enter username and password.";
        return;
    }

    loginButton.disabled = true;  
    errorMessage.style.display = 'none';  

    let user_data = { username, password };

    const token = getCookie('token'); 

    if (token) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = "You are already logged in.";
        loginButton.disabled = false;  
        return;
    }

    try {
        const data = await callUserAdminWS("signin", token, user_data);
        console.log(data);

        if (data.token) {
            errorMessage.style.display = 'none';  
            document.cookie = `token=${data.token}; path=/; max-age=3600; Secure; HttpOnly`;
            window.location.href = '/LoginSuccess';  
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Login failed. Please try again.";
        }
    } catch (error) {
        console.error("Error during login:", error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = "An error occurred during login. Please try again later.";
    } finally {
        loginButton.disabled = false;
    }
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
