README: วิธีการรันโปรเจค

1.ไลบรารี/แพ็กเกจที่ต้องติดตั้ง
	-express	
	-dotenv	
	-mysql2	
	-jsonwebtoken	
	-cors
	-nodemon
2. ไฟล์.env (sec2_gr5_fe_src) 
		PORT = 3001
		SECRET="your-secret"
	ไฟล์.env (sec2_gr5_ws_src) โดย สร้างบัญชี (team_cupicute)  ตามที่ระบุในไฟล์ .env ของ (sec2_gr5_ws_src)
		PORT = 3002
		SECRET="your-secret"
		DB_HOST = localhost
		DB_USER =team_cupicute
		DB_PASSWORD =cupicute
		DB_NAME = sec2_gr5_database

3. cd sec2_gr5_fe_src เพื่อรันserver-front,  cd sec2_gr5_ws_src เพื่อรันserver-back
4. คำสั่งรันทั้งหมด : npm install express dotenv mysql2 jsonwebtoken cors nodemon
5. npm start ของทั้ง2 server
6.  เข้าหน้า home จากpath http://localhost:3001/ ในหน้านี้จะมีสินค้าบางส่วนให้เห็น สามารถกดไปที่สินค้าแต่ละตัวเพื่อไปดูหน้ารายละเอียดของสินค้าแต่ละตัวที่กดได้
หัวข้อสินค้าที่ชื่อ Coming Soon มาจาก API สาธารณะ (******หมายเหตุ: ต้องรอการ upload ข้อมูลประมาณ 30 วินาที ******) แหล่งที่มาและการเข้าถึง API เว็บไซต์ต้นทาง: http://makeup-api.herokuapp.com API Endpoint: http://makeupapi.herokuapp.com/api/v1/products.json ประเภท: Public API (ไม่มีค่าใช้จ่าย) สำหรับข้อมูลเครื่องสำอางจากหลากหลายแบรนด์
และการไปแต่ละหน้าสามารถไปหน้าอื่นๆได้จาก Navigation bar
	กดที่ home (http://localhost:3001/)
	กดที่ Product -Lips ไปหน้าsearch พร้อมสินค้าที่เป็นหมวดหมู่ Lips 
		    -Blush on ไปหน้าsearch พร้อมสินค้าที่เป็นหมวดหมู่  Blush
		    -Highlighter ไปหน้าsearch พร้อมสินค้าที่เป็นหมวดหมู่  Highlight
  		    -Foundation ไปหน้าsearch พร้อมสินค้าที่เป็นหมวดหมู่  Foundation
		    -Mascara ไปหน้าsearch พร้อมสินค้าที่เป็นหมวดหมู่  Mascara
	กดที่ About Us ไปหน้าข้อมูลสมาชิก (http://localhost:3001/Team) สามารถคลิกที่ ข้อความสีชมพูเข้มเพื่อดูช่องทางติดต่อของแต่ละคนได้
	กดที่ Search ไปหน้าค้นหาสินค้า (http://localhost:3001/Search)สามารถค้นหาสินค้าได้จากชื่อ (TITLE), หมวดหมู่ (CATEGORY), ราคา (PRICE) ในrange min-max ,ผลการค้นหาจะมีสินค้าแสดงด้านล่าง สามารถกดไปที่สินค้าแต่ละตัวเพื่อไปดูหน้ารายละเอียดของสินค้าแต่ละตัวที่กดได้
	กดที่ปุ่ม Login (กรณีที่loginแล้วจะไม่มีปุ่มนี้) จะไปหน้าการเข้าสู่ระบบ (http://localhost:3001/login) สามารถกรอกusername และ password ที่มีในระบบ เพื่อไปหน้า การจัดการadminและproduct กรณีที่กดส่งโดยที่ไม่มีข้อมูล จะมีข้อความ Enter username and password. กรณีที่ใส่ผิดจะมีข้อความว่า Invalid username or password.
7. เมื่อสามารถเข้าสู่ระบบได้ด้วยข้อมูลที่ถูกต้องจะนำไปหน้า USER ACCOUNT MANAGEMENT
	 Navigation bar ของหน้านี้ สามารถกดที่ Home (http://localhost:3001/) 
	กด UserManagement หน้า (http://localhost:3001/Admin) สามารถจัดการข้อมูล userและadminได้ โดยicon ปากกาจะไปหน้าการแก้ไข (http://localhost:3001/AdminEdit?userId=xxx) ถ้าเลือกที่UserID 101 จะเป็น (http://localhost:3001/AdminEdit?userId=101) กรณีที่แก้ไขสำเร็จจะมีข้อความ User updated successfully. , icon ถังขยะ จะลบข้อมูลadminที่เลือก , ปุ่ม ADD NEW จะไปหน้าการเพิ่มAdmin (http://localhost:3001/AdminAdd)
		******* หมายเหตุ ไม่สามารถแก้ไข UserID,AdminIDได้ เนื่องจาก เป็น primary key และ Unique key *******
	กด ProductManagement (http://localhost:3001/Product_view) สามารถจัดการข้อมูล rpoduct ได้ โดยicon ปากกาจะไปหน้าการแก้ไข (http://localhost:3001/ProductEdit?productId=xxx) ถ้าเลือกที่ProductID 001 จะเป็น (http://localhost:3001/ProductEdit?productId=001) กรณีที่เพิ่มสำเร็จจะมีข้อความ Product updated successfully!, icon ถังขยะ จะลบข้อมูลproductที่เลือก , ปุ่ม ADD NEW จะไปหน้าการเพิ่มproduct (http://localhost:3001/ProductAdd)
		******* หมายเหตุ ไม่สามารถแก้ไข ProductID ได้ เนื่องจาก เป็น primary key และ Unique key*******

	กด Logout จะออกจากระบบ และนำไปสู่หน้า home 

8. กรณีที่ login แล้ว  Navigation bar ของหน้า home จะมีปุ่ม Management ที่สามารถไปหน้า USER ACCOUNT MANAGEMENT (http://localhost:3001/Admin), Product Management  (http://localhost:3001/Product_view)

		******* หมายเหตุ ไม่สามารถเพิ่มรูปได้ *******
		******* หมายเหตุ ไม่สามารถมีข้อมููล Last updated ที่อัพเดตproduct และ Last Active ของAdmin *******
	
 
