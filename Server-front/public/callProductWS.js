const rootURL = "http://localhost:3002";


//ไม่ใช้ token
export async function callProductWS(url, method, productData) { 
    let data;
    const fullURL = new URL(url, rootURL);

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

                //data = await response.json();
                break;

            case "updateProduct": // อัปเดตข้อมูล Product
                response = await fetch(fullURL, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                break;

            case "deleteProduct": // ลบ Product
                response = await fetch(fullURL, {
                    method: "DELETE",
                });
                break;

            default:
                throw new Error("Method not supported.");
        }
    } catch (error) {
        console.error("Error in callProductWS:", error.message);
    }
    return data;
}