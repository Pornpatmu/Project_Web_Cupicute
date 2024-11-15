async function callWS(url, method, token = "", sentData = {}) {
    try {
        let response;

        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method: method.toUpperCase(),  // กำหนด HTTP method เช่น GET, POST, PUT, DELETE
            headers: headers,
        };

        if (method === 'signin' || method === 'insert' || method === 'update') {
            // สำหรับ POST และ PUT
            options.body = JSON.stringify(sentData);  
        } else if (method === 'delete') {
            // สำหรับ DELETE
            options.body = JSON.stringify(sentData);  
        }

        // ส่งคำขอไปยัง URL โดยใช้ fetch
        response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;  // คืนค่าข้อมูลที่ได้รับ

    } catch (error) {
        console.error('Error message:', error.message);
        return { error: true, message: error.message || "An unexpected error occurred!" };
    }
}

export { callWS };
