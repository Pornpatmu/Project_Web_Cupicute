const rootURL = "http://localhost:3001";

export async function callProductWS(url, method) {
    let data;
    const fullURL = new URL(url, rootURL);

    let response;
    switch (method) {
        case "getProducts":
            response = await fetch(fullURL, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                },
            });

            data = await response.json();
    }
    return data;
}
