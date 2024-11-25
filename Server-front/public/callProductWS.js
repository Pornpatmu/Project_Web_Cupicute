const rootURL = "http://localhost:3002";


//ไม่ใช้ token
export async function callProductWS(url, method, productData) { 
    let data;
    const fullURL = new URL(url, rootURL);
    console.log(method);

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

// const rootURL = "http://localhost:3002";

// export async function callProductWS(url, method, productData) {
//     let data;
//     const fullURL = new URL(url, rootURL);

//     try {
//         let response;
//         switch (method) {
//             case "getProducts": // เพิ่มการรองรับ GET สินค้าตัวเดียว
//                 response = await fetch(fullURL, {
//                     method: "GET",
//                     headers: {
//                         'Accept': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error(`GET request failed with status: ${response.status}`);
//                 }
//                 data = await response.json(); // ดึงข้อมูลสินค้า
//                 break;

//             case "insertProduct":
//                 response = await fetch(fullURL, {
//                     method: "POST",
//                     headers: {
//                         'Accept': 'application/json',
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(productData),
//                 });
//                 if (!response.ok) {
//                     throw new Error(`POST request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             case "updateProduct":
//                 response = await fetch(fullURL, {
//                     method: "PUT",
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         ProductID: productData.ProductID,
//                         product: productData.product,
//                     }),
//                 });
//                 if (!response.ok) {
//                     throw new Error(`PUT request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             case "deleteProduct":
//                 response = await fetch(fullURL, {
//                     method: "DELETE",
//                 });
//                 if (!response.ok) {
//                     throw new Error(`DELETE request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             default:
//                 throw new Error("Method not supported.");
//         }
//     } catch (error) {
//         console.error("Error in callProductWS:", error.message);
//         data = { error: error.message }; // ส่ง error กลับไปให้ client
//     }
//     return data;
// }



// const rootURL = "http://localhost:3002";

// export async function callProductWS(url, method, productData) {
//     let data;
//     const fullURL = new URL(url, rootURL);

//     try {
//         let response;
//         switch (method) {
//             case "getProducts": // เพิ่มการรองรับ GET สินค้าตัวเดียว
//                 response = await fetch(fullURL, {
//                     method: "GET",
//                     headers: {
//                         'Accept': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error(`GET request failed with status: ${response.status}`);
//                 }
//                 data = await response.json(); // ดึงข้อมูลสินค้า
//                 break;

//             case "insertProduct":
//                 response = await fetch(fullURL, {
//                     method: "POST",
//                     headers: {
//                         'Accept': 'application/json',
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(productData),
//                 });
//                 if (!response.ok) {
//                     throw new Error(`POST request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//                 case "updateProduct":
//                     response = await fetch(fullURL, {
//                         method: "PUT",
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(productData),
//                     });
//                     if (!response.ok) {
//                         throw new Error(`PUT request failed with status: ${response.status}`);
//                     }
//                     data = await response.json();
//                     break;

            

//             case "deleteProduct":
//                 // เพิ่มการลบสินค้าโดยใช้ ProductID ใน URL
//                 const deleteURL = new URL(`${url}/${productData.ProductID}`, rootURL);
//                 response = await fetch(deleteURL, {
//                     method: "DELETE",
//                 });
//                 if (!response.ok) {
//                     throw new Error(`DELETE request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             default:
//                 throw new Error("Method not supported.");
//         }
//     } catch (error) {
//         console.error("Error in callProductWS:", error.message);
//         data = { error: error.message }; // ส่ง error กลับไปให้ client
//     }
//     return data;
// }


// const rootURL = "http://localhost:3002";

// export async function callProductWS(url, method, productData) {
//     let data;
//     const fullURL = new URL(url, rootURL);

//     try {
//         let response;
//         switch (method) {
//             case "getProducts": // ดึงข้อมูลสินค้า (GET)
//                 response = await fetch(fullURL, {
//                     method: "GET",
//                     headers: {
//                         'Accept': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error(`GET request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             case "insertProduct": // เพิ่มสินค้าใหม่ (POST)
//                 response = await fetch(fullURL, {
//                     method: "POST",
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(productData),
//                 });
//                 if (!response.ok) {
//                     throw new Error(`POST request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             case "updateProduct": // แก้ไขสินค้า (PUT)
//                 response = await fetch(fullURL, {
//                     method: "PUT",
//                     headers: {
//                         "Accept": "application/json",
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(productData),
//                 });
//                 if (!response.ok) {
//                     const errorDetails = await response.json(); // อ่านรายละเอียดข้อผิดพลาด
//                     console.error("Error details from backend:", errorDetails);
//                     throw new Error(`PUT request failed with status: ${response.status}, message: ${errorDetails.message || 'Unknown error'}`);
//                 }
//                 data = await response.json();
//                 break;

//             case "deleteProduct": // ลบสินค้า (DELETE)
//                 const deleteURL = new URL(`${url}/${productData.ProductID}`, rootURL);
//                 response = await fetch(deleteURL, {
//                     method: "DELETE",
//                     headers: {
//                         'Accept': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error(`DELETE request failed with status: ${response.status}`);
//                 }
//                 data = await response.json();
//                 break;

//             default:
//                 throw new Error("Method not supported.");
//         }
//     } catch (error) {
//         console.error("Error in callProductWS:", error.message);
//         data = { error: true, message: error.message }; // ส่ง error กลับไปให้ client
//     }
//     return data;
// }
