CREATE DATABASE  IF NOT EXISTS `cupicute_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cupicute_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: cupicute_db
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `AdminID` varchar(7) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `AdminID` (`AdminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('6687000','Mali','Suayjang','098-765-4321','Mahidol Salaya','Mali.sua@student.mahidol.edu'),('6687003','Taechinee','Ratanwimon','098-946-9619','Mahidol Salaya','taechinee.rat@student.mahidol.edu'),('6687018','Natnicha','Malailoy','099-326-9915','Mahidol Salaya','natnicha.maa@student.mahidol.edu'),('6687039','Pornpat','Punthong','081-519-3694','Mahidol Salaya','pornpat.pun@student.mahidol.edu'),('6687070','Wanlida','Suphasri-itsara','090-142-6358','Mahidol Salaya','wanlida.sup@student.mahidol.edu');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductID` varchar(4) NOT NULL,
  `ProductName` varchar(100) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `P_Description` text,
  `ImageURL` varchar(255) DEFAULT NULL,
  `CategoryID` varchar(5) DEFAULT NULL,
  `dateAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProductID`),
  UNIQUE KEY `ProductID` (`ProductID`),
  KEY `cn_FK_Category_ID` (`CategoryID`),
  CONSTRAINT `cn_FK_Category_ID` FOREIGN KEY (`CategoryID`) REFERENCES `productcategory` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('001','Venus Heart Tint',299.00,'This luxurious lip product is designed to deliver a captivating blend of color and hydration, leaving your lips feeling soft and looking radiant. Infused with a unique blend of nourishing ingredients, Lucky Charm Blam not only enhances the natural beauty of your lips but also provides long-lasting, comfortable wear.','/images/product/001.png','1','2024-10-15 10:00:00'),('002','Kisses Blam Lipstick',299.00,'This luxurious matte lipstick delivers a rich, velvety finish with intense color payoff that lasts all day. Specially formulated for comfort, Kisses Matte Lipstick glides on smoothly without drying, leaving your lips feeling soft and plush.','/images/product/002.png','1','2024-10-20 10:00:00'),('003','Dreamy Dew Foundation',499.00,'This lightweight, hydrating foundation is specially formulated to provide a natural, radiant finish that looks like a second skin. With its buildable coverage, Dreamy Dew Foundation effortlessly evens out skin tone and blurs imperfections without feeling heavy or cakey.','/images/product/003.png','2','2024-10-15 10:00:00'),('004','Angel Touch Foundation',499.00,'This luxurious, silky-smooth foundation glides onto the skin, delivering a flawless, airbrushed finish that feels feather-light. With medium to full coverage, Angel Touch Foundation effortlessly conceals imperfections and evens out skin tone while maintaining a natural, radiant look. Formulated with hydrating and skin-friendly ingredients, it keeps skin feeling comfortable and fresh all day.','/images/product/004.png','2','2024-10-15 10:00:00'),('005','Fairy Bloom Blush',399.00,'This lightweight, sheer-coverage foundation enhances your skins natural tone, delivering a soft, radiant finish that feels like a second skin. Perfect for those who prefer a barely-there look, Sweetheart Sheer Foundation smooths and blurs imperfections while letting your true beauty shine through.','/images/product/005.png','3','2024-10-15 10:00:00'),('006','Blossom Breeze Blush',399.00,'This blush offers a delicate, airy finish with a hint of floral-inspired radiance, perfect for achieving a natural, flushed effect. Its finely milled texture ensures smooth application and a soft, blendable touch that complements all skin tones.','/images/product/006.png','3','2024-11-15 10:00:00'),('007','Angel’s Arrow Mascara',199.00,'Designed to give your lashes an otherworldly length and volume, this mascara adds drama and depth to your look with just a few strokes. Its rich, long-lasting formula is smudge-proof and flake-resistant, keeping your lashes bold and defined throughout the day.','/images/product/007.png','4','2024-11-15 10:00:00'),('008','Lash of Love Mascara',199.00,'This mascara is crafted to add soft, fluttery volume with a touch of romance, defining each lash for a naturally beautiful effect. Its lightweight, clump-free formula enhances length and lift, perfect for a day-to-night look.','/images/product/008.png','4','2024-11-15 10:00:00'),('009','Shinny glow Hightlight',399.00,'This highlighter is designed to give your skin a radiant, ethereal glow, perfect for any occasion. With its silky-smooth texture and blendable formula, it seamlessly enhances your natural features and adds a touch of luminosity to your makeup routine.','/images/product/009.png','5','2024-11-15 10:00:00'),('010','Magic Dust Hightlight',399.00,'This enchanting highlighter is designed to deliver an irresistible, ethereal glow that enhances your natural beauty. With its finely milled formula, Magic Dust creates a stunning, soft-focus effect that adds luminosity to your complexion without any chalkiness.','/images/product/010.png','5','2024-11-15 10:00:00');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productcategory`
--

DROP TABLE IF EXISTS `productcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productcategory` (
  `CategoryID` varchar(1) NOT NULL,
  `CategoryName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `CategoryID` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productcategory`
--

LOCK TABLES `productcategory` WRITE;
/*!40000 ALTER TABLE `productcategory` DISABLE KEYS */;
INSERT INTO `productcategory` VALUES ('1','Lips'),('2','Foundation'),('3','Blush'),('4','Mascara'),('5','Highlight ');
/*!40000 ALTER TABLE `productcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` varchar(5) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `U_Password` varchar(50) NOT NULL,
  `LoginTimestamp` datetime DEFAULT NULL,
  `User_Image` varchar(255) DEFAULT NULL,
  `AdminID` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID` (`UserID`),
  KEY `cn_FK_AdminID` (`AdminID`),
  CONSTRAINT `cn_FK_AdminID` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('101','taechine_03','Ggrace2547','2023-10-10 08:00:00','/images/user/101.jpg','6687003'),('102','natnicha_18','Mint2548','2023-10-05 14:22:15','/images/user/102.jpg','6687018'),('103','pornpat_39','fernfern2548','2023-10-07 09:30:15','/images/user/103.jpg','6687039'),('104','wanlida_70','pondpond2547','2023-10-07 08:12:15','/images/user/104.jpg','6687070'),('105',',mali_00','mali2547','2023-10-07 07:25:15','/images/user/105.jpg','6687000');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19 13:03:50
