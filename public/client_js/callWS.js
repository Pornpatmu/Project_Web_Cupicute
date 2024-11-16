
export async function callWS(url, method, token = "", sentData = {}) {
    let data;
    if (method === "signin") {
        let response = await fetch(url, {
            method: "POST",  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sentData),
     
        });
        data = await response.json();  
    }
    return data;
}
