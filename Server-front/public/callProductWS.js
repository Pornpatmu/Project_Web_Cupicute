const rootURL = "http://localhost:3002";

export async function callProductWS(url, method, productData = null) {
    let data;
    const fullURL = new URL(url, rootURL);
    console.log(`Calling method: ${method} at ${fullURL}`);

    try {
        let response;
        switch (method) {
            case "getProducts":
                response = await fetch(fullURL, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                data = await response.json();
                console.log(data);
                break;

            case "insertProduct":
                response = await fetch(fullURL, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                data = await response.json();
                console.log(data);
                break;

            case "updateProduct":
                response = await fetch(fullURL, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ProductID: productData.ProductID,
                        product: productData.product,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                data = await response.json();
                console.log(data);
                break;

                case "deleteProduct":
                    response = await fetch(fullURL, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ProductID: productData.ProductID,
                        }),
                    });
                
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    data = await response.json();
                    console.log(data);
                    break;
       
            default:
                throw new Error("Method not supported.");
        }
    } catch (error) {
        console.error("Error in callProductWS:", error.message);
        alert(`Error: ${error.message}`);
    }
    return data;
}
