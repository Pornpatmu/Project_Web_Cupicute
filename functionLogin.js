const jwt = require('jsonwebtoken');
const connection_db = require('./db.js'); // เชื่อมต่อฐานข้อมูล

const functionLogin = {};

// ฟังก์ชันสำหรับการล็อกอิน
functionLogin.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);


  try {
    // ตรวจสอบข้อมูลการล็อกอินกับฐานข้อมูล
    const [results] = await connection_db.promise().query('SELECT * FROM User WHERE Username = ?', [username]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // ตรวจสอบรหัสผ่าน
    if (user.Password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });r
    }

    // สร้าง JWT token
    const token = jwt.sign({ id: user.UserID, username: user.Username }, process.env.SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    return res.status(500).json({ message: 'Error occurred during login', error: err.message });
  }
};

module.exports = functionLogin;
