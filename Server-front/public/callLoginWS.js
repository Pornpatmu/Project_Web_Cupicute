const rootURL = "http://localhost:3002"; 

export async function callLoginWS(method, sentData = {}) {
    let data;
    let response;
    const token = localStorage.getItem('authToken');


    switch (method) {
        case "signin":
            response = await fetch(rootURL + '/signin', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sentData),  
            });
            console.log(response);
            data = await response.json();
            console.log(data.token);

            if (data.token) {
                localStorage.setItem('authToken', data.token);
                console.log(localStorage.getItem('authToken')); 
            }

            break;

        case "logout":
            if (!token) {
                console.log("No token found. Cannot log out.");
                return;  
            }
            response = await fetch(rootURL + '/logout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            data = await response.json();  
            break;
            
            case "getUserProfile":
                response = await fetch(rootURL + '/UserAdminselect', {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                },
            });
            data = await response.json(); 
            break;
        default:
            break;
    }

    return data;
}
