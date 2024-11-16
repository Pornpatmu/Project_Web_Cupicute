const rootURL = "http://localhost:3001";

export async function callUserAdminWS(method, token = "", sentData = {}) {
    let data;
    let response;
    
    switch (method) {
        case "signin":
            response = await fetch(rootURL+'/signin', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(sentData),
            });
            data = await response.json();
    }
    return data;
}