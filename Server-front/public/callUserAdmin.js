const rootURL = "http://localhost:3002"; 

export async function callUserAdmin(method, UserAdminData) { 
    let data;
    let response;
    const token = localStorage.getItem('authToken');


    switch (method) {
        case "":
            response = await fetch(rootURL + '/', {
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
