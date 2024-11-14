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
    AdminID VARCHAR(7) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    FullName VARCHAR(100) AS (CONCAT(FirstName, ' ', LastName)),
    PhoneNumber VARCHAR(15),
    Address VARCHAR(100)
);
INSERT INTO Admin (AdminID, FirstName, LastName, PhoneNumber, Address)
VALUES 
('6687039', 'Pornpat', 'Punthong', '081-519-3694', 'Saraburi'),
('6687070', 'Wanlida', 'Supasriitsara', '090-142-6358', 'Prachuap');

-- Table for User
-- drop table user;

CREATE TABLE User (
    UserID  VARCHAR(3) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
    CreateAt DATETIME,
    LoginTimestamp DATETIME,
    Image LONGBLOB
); 
INSERT INTO User (UserID, Username, Password, Email, CreateAt, LoginTimestamp, Image)
VALUES 
('001', 'pornpat_39', 'fernfern2548', 'pornpat.pun@student.mahidol.edu', '2023-10-01 12:34:56',  '2023-10-10 08:00:00', NULL),
('002', 'wanlida_70', 'pondpond2547', 'wanlida.sup@student.mahidol.edu', '2023-10-05 14:22:15',  NULL, NULL);

-- Table for Product
-- drop table product;

CREATE TABLE Product (
    ProductID VARCHAR(4) PRIMARY KEY,
    ProductName VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10, 2),
    Amount INT,
    AddedDate DATE,
    ImageURL VARCHAR(255)
);
INSERT INTO Product (ProductID, ProductName, Description, Price, Amount, AddedDate, ImageURL)
VALUES 
('0001', 'Yves Saint Laurent Loveshine Candy Glow Lip Balm', 'Loveshine Candy Glow lipstick', 1650, 3, '2023-09-15', '/images/product_image1.png'),
('0002', 'Curl Fix Mascara ', 'Curl Fix Mascara in black', 590, 1, '2023-10-02', '/images/product_image2.png');

-- Table for ProductCategory
-- drop table ProductCategory;

CREATE TABLE ProductCategory (
    CategoryID VARCHAR(1) PRIMARY KEY,
    CategoryName VARCHAR(50)
);

INSERT INTO ProductCategory (CategoryID, CategoryName)
VALUES 
('1', 'Lips'),
('2', 'Blush on'),
('3', 'Highlighter'),
('4', 'Foundation'),
('5', 'Mascara');

-- Table for ProductColor
-- drop table ProductColor;
CREATE TABLE ProductColor (
    ColorCode CHAR(7) PRIMARY KEY,
    ColorName VARCHAR(50),
    Quantity int
);

INSERT INTO ProductColor (ColorCode, ColorName, Quantity)
VALUES 
('#FFFFFF', 'White', 1),  
('#000000', 'Black', 1),   
('#FF5733', 'Orange', 1);

-- Table for Product and ProductCategory (M:N Relationship)
-- drop table Product_ProductCategory;
CREATE TABLE Product_ProductCategory (
	ProductID VARCHAR(4), 
    CategoryID VARCHAR(1), 
    PRIMARY KEY (ProductID, CategoryID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (CategoryID) REFERENCES ProductCategory(CategoryID)
);
INSERT INTO Product_ProductCategory (ProductID, CategoryID)
VALUES 
('0001', '1'),
('0002', '5');

-- Table for Product and ProductColor (M:N Relationship)
-- drop table Product_ProductColor
CREATE TABLE Product_ProductColor (
   	ProductID VARCHAR(4), 
    ColorCode CHAR(7),
    PRIMARY KEY (ProductID, ColorCode),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (ColorCode) REFERENCES ProductColor(ColorCode)
);
INSERT INTO Product_ProductColor (ProductID, ColorCode)
VALUES 
('0001', '#FFFFFF'),
('0002', '#FF5733');