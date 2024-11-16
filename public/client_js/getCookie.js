
export function getCookie(name) {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : ''; // ถ้ามีคุกกี้ ให้คืนค่า, ถ้าไม่มีให้คืนค่าว่าง
}

export function setCookie(name, value, maxAgeInSeconds = 3600) {
    const expires = new Date(Date.now() + maxAgeInSeconds * 1000).toUTCString();
    document.cookie = `${name}=${value}; path=/; expires=${expires}; Secure; HttpOnly`;
}
