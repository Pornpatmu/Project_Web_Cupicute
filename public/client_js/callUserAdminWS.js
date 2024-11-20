const rootURL = "http://localhost:3001";

export async function callUserAdminWS(method, sentData = {}) {
    let data;
    let response;

    switch (method) {
        case "signin":
            response = await fetch(rootURL + '/signin', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sentData),
                credentials: 'include'
            });
            data = await response.json();
            break;
        case "logout":
            response = await fetch(rootURL + '/logout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            data = await response.json();
            break;
    }

    return data;
}
