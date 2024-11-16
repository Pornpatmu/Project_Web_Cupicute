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
    let user_data = { username, password };
    loginButton.disabled = true; //ป้องกันไม่ให้คลิกซ้ำ
    
    const token = getCookie('token'); // ใช้ token ที่ได้จาก getCookie
    console.log('Token from cookie:', token);
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; 


    callUserAdminWS("signin", token, user_data).then((data) => {
        console.log(data);
        if (data.token) {
            errorMessage.style.display = 'none';
            document.cookie = `token=${data.token}; path=/; max-age=3600; Secure; HttpOnly`;
            window.location.href = '/LoginSuccess'; 
        } else {
            errorMessage.style.display = 'block';
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
