SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = '+07:00';


DROP DATABASE IF EXISTS cupicute_db;
CREATE DATABASE IF NOT EXISTS `cupicute_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cupicute_db`;

-- Table for Admin
-- drop table Admin;

CREATE TABLE Admin (
    AdminID VARCHAR(7) not null  unique,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    PhoneNumber VARCHAR(15),
    Address VARCHAR(200),
    Email VARCHAR(100),
    constraint	cn_PK_AdminID	primary key (AdminID)
);
INSERT INTO Admin (AdminID, FirstName, LastName, PhoneNumber, Address,Email)
VALUES 
('6687003', 'Taechinee', 'Ratanwimon', '098-946-9619', 'Mahidol Salaya','taechinee.rat@student.mahidol.edu'),
('6687018', 'Natnicha', 'Malailoy', '099-326-9915', 'Mahidol Salaya','natnicha.maa@student.mahidol.edu'),
('6687039','Pornpat','Punthong','081-519-3694','Mahidol Salaya','pornpat.pun@student.mahidol.edu'),
('6687070','Wanlida','Suphasri-itsara','090-142-6358','Mahidol Salaya','wanlida.sup@student.mahidol.edu'),
('6687000','Mali','Suayjang','098-765-4321','Mahidol Salaya','Mali.sua@student.mahidol.edu');

-- Table for User
-- drop table user;

CREATE TABLE User (
    UserID  VARCHAR(5)  not null  unique,
    Username VARCHAR(50) NOT NULL,
    U_Password VARCHAR(50) NOT NULL,
    LoginTimestamp DATETIME,
    User_Image VARCHAR(255) ,
    AdminID VARCHAR(7),
    constraint	cn_PK_UserID	primary key (UserID),
    constraint	cn_FK_AdminID   foreign key (AdminID)
								references  Admin (AdminID)
); 

INSERT INTO User (UserID, Username, U_Password, LoginTimestamp, User_Image, AdminID)
VALUES 
('101', 'taechine_03', 'Ggrace2547',  '2023-10-10 08:00:00', '/image/user/101.png', '6687003'),
('102', 'natnicha_18', 'Mint2548', '2023-10-05 14:22:15',  '/image/user/102.png','6687018'),
('103','pornpat_39','fernfern2548','2023-10-07 09:30:15','/image/user/103.png','6687039'),
('104','wanlida_70','pondpond2547','2023-10-07 08:12:15', '/image/user/104.png','6687070'),
('105',',mali_00','mali2547','2023-10-07 07:25:15', '/image/user/105.png','6687000');

-- Table for ProductCategory
-- drop table ProductCategory;

CREATE TABLE ProductCategory (
    CategoryID VARCHAR(1) not null unique,
    CategoryName VARCHAR(50),
     constraint	cn_PK_CategoryID	primary key (CategoryID)
);

INSERT INTO ProductCategory (CategoryID, CategoryName)
VALUES 
('1', 'Lips'),
('2', 'Foundation'),
('3', 'Blush'),
('4', 'Mascara'),
('5', 'Highlight ');

-- Table for Product
-- drop table product;

CREATE TABLE Product (
    ProductID VARCHAR(4) not null unique,
    ProductName VARCHAR(100),
    Price DECIMAL(10, 2),
    P_Description TEXT,
    ImageURL VARCHAR(255) ,
    CategoryID VARCHAR(5),
    constraint	cn_PK_ProductID	primary key (ProductID),
	constraint	cn_FK_Category_ID  foreign key (CategoryID)
								references  ProductCategory (CategoryID)
);
INSERT INTO Product (ProductID, ProductName,Price, P_Description, ImageURL, CategoryID)
VALUES 
	('001','Venus Heart Tint',299,'This luxurious lip product is designed to deliver a captivating blend of color and hydration, leaving your lips feeling soft and looking radiant. Infused with a unique blend of nourishing ingredients, Lucky Charm Blam not only enhances the natural beauty of your lips but also provides long-lasting, comfortable wear.',
    '/image/product/001.png','1'),
    ('002','Kisses Blam Lipstick',299,'This luxurious matte lipstick delivers a rich, velvety finish with intense color payoff that lasts all day. Specially formulated for comfort, Kisses Matte Lipstick glides on smoothly without drying, leaving your lips feeling soft and plush.',
    '/image/product/002.png','1'),
    ('006','Dreamy Dew Foundation',499,'This lightweight, hydrating foundation is specially formulated to provide a natural, radiant finish that looks like a second skin. With its buildable coverage, Dreamy Dew Foundation effortlessly evens out skin tone and blurs imperfections without feeling heavy or cakey.',
    '/image/product/006.png','2'),
    ('007','Angel Touch Foundation',499,'This luxurious, silky-smooth foundation glides onto the skin, delivering a flawless, airbrushed finish that feels feather-light. With medium to full coverage, Angel Touch Foundation effortlessly conceals imperfections and evens out skin tone while maintaining a natural, radiant look. Formulated with hydrating and skin-friendly ingredients, it keeps skin feeling comfortable and fresh all day.',
    '/image/product/007.png','2'),
    ('011','Fairy Bloom Blush',399,'This lightweight, sheer-coverage foundation enhances your skins natural tone, delivering a soft, radiant finish that feels like a second skin. Perfect for those who prefer a barely-there look, Sweetheart Sheer Foundation smooths and blurs imperfections while letting your true beauty shine through.',
    '/image/product/011.png','3'),
    ('012','Blossom Breeze Blush',399,'This blush offers a delicate, airy finish with a hint of floral-inspired radiance, perfect for achieving a natural, flushed effect. Its finely milled texture ensures smooth application and a soft, blendable touch that complements all skin tones.',
    '/image/product/012.png','3'),
    ('017',' Angel’s Arrow Mascara',199,'Designed to give your lashes an otherworldly length and volume, this mascara adds drama and depth to your look with just a few strokes. Its rich, long-lasting formula is smudge-proof and flake-resistant, keeping your lashes bold and defined throughout the day.',
    '/image/product/017.png','4'),
    ('018','Lash of Love Mascara',199,'This mascara is crafted to add soft, fluttery volume with a touch of romance, defining each lash for a naturally beautiful effect. Its lightweight, clump-free formula enhances length and lift, perfect for a day-to-night look.',
    '/image/product/018.png','4'),
    ('022','Shinny glow Hightlight',399,'This highlighter is designed to give your skin a radiant, ethereal glow, perfect for any occasion. With its silky-smooth texture and blendable formula, it seamlessly enhances your natural features and adds a touch of luminosity to your makeup routine.',
    '/image/product/022.png','5'),
    ('023','Magic Dust Hightlight',399,'This enchanting highlighter is designed to deliver an irresistible, ethereal glow that enhances your natural beauty. With its finely milled formula, Magic Dust creates a stunning, soft-focus effect that adds luminosity to your complexion without any chalkiness.',
    '/image/product/023.png','5');


select * from Admin;
select * from User;
select * from ProductCategory;
select * from Product;
-- CREATE TABLE Manage (
-- 	ProductID VARCHAR(4) not null PRIMARY KEY,
--     AdminID VARCHAR(7) not null PRIMARY KEY
-- );

-- insert Into Manage (
