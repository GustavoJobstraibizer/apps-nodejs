CREATE DATABASE  IF NOT EXISTS `portal_noticias` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `portal_noticias`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: portal_noticias
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `noticia` text,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resumo` varchar(100) DEFAULT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `data_noticia` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` VALUES (1,'titulo da noticia','conteudo da noticia','2017-01-11 00:48:06',NULL,NULL,NULL),(2,'titulo da noticias 2','conteudo da noticias 2','2017-01-11 00:57:09',NULL,NULL,NULL),(3,'primeira noticia no post','primeira notícia','2017-01-12 01:02:03',NULL,NULL,NULL),(4,'testando 2','teste 2','2017-01-12 01:12:53',NULL,NULL,NULL),(5,'teste','teste111','2017-01-12 01:37:17','teste','gu','2017-01-19'),(6,'Teste noticia 10','teste noticia','2017-01-12 01:49:40','outra noticia','Gustavo','2017-01-11'),(7,'teste','testes','2017-01-12 02:34:08','testesetsetsetsettestsets','teste ','2017-01-01'),(8,'teste','teste','2017-01-13 00:26:33','teste\'foiasjdfjoiajsdf','gu','2017-01-02'),(9,'tests111','teste','2017-01-13 00:29:03','oriuwoiruowieruoiweur','iuaseiuyi','2017-01-17'),(10,'teste','teste','2017-01-13 01:01:48','sjaoifjasçoijfçasijf','teste','2017-12-31'),(11,'tste','teste','2017-01-13 02:14:59','tsssetsetsesttestset','gustavo','2017-01-01');
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-07 19:29:36
