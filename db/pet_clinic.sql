-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 26 Eyl 2021, 16:51:44
-- Sunucu sürümü: 10.4.20-MariaDB
-- PHP Sürümü: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `pet_clinic`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bill`
--

CREATE TABLE `bill` (
  `bill_id` varchar(255) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `opestatus` bit(1) DEFAULT NULL,
  `paymenttype` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `bill`
--

INSERT INTO `bill` (`bill_id`, `amount`, `cus_id`, `date`, `note`, `opestatus`, `paymenttype`) VALUES
('417809739', 4, 6, '2021-09-23 20:23:54', 'kayıtlı', b'0', 1),
('421594215', 18, 7, '2021-09-23 21:26:58', 'not', b'0', 2),
('422761119', 4, 8, '2021-09-23 21:46:21', 'turan not', b'0', 1),
('423029631', 180, 9, '2021-09-23 21:50:44', '180TL Alış Yapıldı.', b'1', 1),
('438937156', 200, 8, '2021-09-24 02:16:01', 'Turan Not', b'0', 3),
('473719612', 30, 11, '2021-09-24 11:56:00', '30TL Alış Yapıldı.', b'1', 1),
('473903714', 120, 9, '2021-09-24 11:58:39', '120TL Alış Yapıldı.', b'1', 2),
('474205289', 18, 8, '2021-09-24 12:03:37', 'turana satıldı', b'0', 1),
('474298313', 120, 6, '2021-09-24 12:05:14', 'umuta satıldı', b'0', 3),
('474434626', 200, 9, '2021-09-24 12:07:29', 'Ali satıldı', b'0', 2),
('474737848', 120, 10, '2021-09-24 12:12:30', 'Deneme satıs', b'0', 2),
('475790743', 4, 9, '2021-09-24 12:30:01', 'ali veli', b'0', 2),
('477489344', 18, 6, '2021-09-24 12:58:27', 'kayıtlı satıs', b'0', 2),
('477829113', 120, 8, '2021-09-24 13:04:10', 'Turana kuduz aşısı', b'0', 1),
('488051337', 120, 11, '2021-09-24 15:54:30', 'Hakan hoca aldı', b'0', 2),
('491465321', 120, 6, '2021-09-24 16:51:24', 'Umut kuduz asısı aldı', b'0', 1),
('666083511', 200, 14, '2021-09-26 17:23:38', 'Sunum Notu', b'0', 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `box_action`
--

CREATE TABLE `box_action` (
  `boid` int(11) NOT NULL,
  `bid` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `prodid` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `suid` int(11) DEFAULT NULL,
  `warid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `calendar_info`
--

CREATE TABLE `calendar_info` (
  `cid` int(11) NOT NULL,
  `cbg_color` varchar(255) DEFAULT NULL,
  `cborder_color` varchar(255) DEFAULT NULL,
  `ccolor` varchar(255) DEFAULT NULL,
  `cdrag_bg_color` varchar(255) DEFAULT NULL,
  `cname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `calendar_info`
--

INSERT INTO `calendar_info` (`cid`, `cbg_color`, `cborder_color`, `ccolor`, `cdrag_bg_color`, `cname`) VALUES
(1, '#9e5fff', '#9e5fff', '#ffffff', '#9e5fff', 'Hasta'),
(2, '#ff3333', '#ff3333', '#ffffff', '#ff3333', 'Randevu');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `category`
--

CREATE TABLE `category` (
  `caid` int(11) NOT NULL,
  `categoryname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `category`
--

INSERT INTO `category` (`caid`, `categoryname`) VALUES
(1, 'Kategori');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `customer`
--

CREATE TABLE `customer` (
  `cid` int(11) NOT NULL,
  `caddress` varchar(255) DEFAULT NULL,
  `cdiscount` int(11) NOT NULL,
  `cdistrict` varchar(255) DEFAULT NULL,
  `cname` varchar(255) DEFAULT NULL,
  `cnote` varchar(255) DEFAULT NULL,
  `cprovince` varchar(255) DEFAULT NULL,
  `csurname` varchar(255) DEFAULT NULL,
  `ctype` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_phone` varchar(255) DEFAULT NULL,
  `tax` int(11) NOT NULL,
  `tax_administration` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `customer`
--

INSERT INTO `customer` (`cid`, `caddress`, `cdiscount`, `cdistrict`, `cname`, `cnote`, `cprovince`, `csurname`, `ctype`, `email`, `mobile_phone`, `tax`, `tax_administration`) VALUES
(6, 'Bozkurt mah. Çiğdem Apt', 0, 'ŞİŞLİ', 'Umut', 'Not', 'İSTANBUL', 'Altın', 0, 'umutaltin60@gmail.com', '564654', 2153242, ''),
(7, 'Cihannuma Mah.', 25, 'Beşiktaş', 'Erkan', '', 'İstanbul', 'Bilir', 0, 'erkan@mail.com', '4564564', 2134124, ''),
(8, 'Vatan cd.', 25, 'Merkez', 'Turan', 'Turan Not', 'Madrid', 'Çaymaz', 0, 'turan@mail.com', '24654', 5546, ''),
(9, 'Adres', 5, 'İlçe', 'Ali', 'ali not', 'İl', 'Veli', 2, 'ali@mail.com', '555', 222, '-'),
(10, 'Adres', 25, 'İlçe', 'Deneme', 'not', 'İl', 'Bilki', 1, 'deneme@mail.com', '232', 2323, '-'),
(11, 'Adres', 15, 'İlçe', 'Hakan', 'Not', 'İl', 'Özer', 2, 'hakan@mail.com', '123', 123, '-'),
(12, '-', 15, '-', 'İlkay', '-', '-', 'Er', 2, 'ilkay@mail.com', '564654', 4564, '-'),
(14, '-', 25, 'İlçe', 'Sunum', 'Sunum Not', 'İl', 'Sunum', 1, 'sunum@mail.com', '5553332211', 22211, '-');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `customer_pets`
--

CREATE TABLE `customer_pets` (
  `customer_cid` int(11) NOT NULL,
  `pets_pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `customer_pets`
--

INSERT INTO `customer_pets` (`customer_cid`, `pets_pid`) VALUES
(6, 5),
(7, 6),
(7, 7),
(8, 8),
(8, 9),
(8, 10),
(9, 11),
(10, 12),
(11, 13),
(11, 14),
(12, 15),
(12, 16),
(14, 18),
(14, 19);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `diary`
--

CREATE TABLE `diary` (
  `did` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `dtime` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `diary`
--

INSERT INTO `diary` (`did`, `date`, `detail`, `dtime`, `title`) VALUES
(1, '2021-09-23 03:00:00', 'Sayfaları birleştirmede sorun çıktı.', '20:07', 'Proje Son Gün'),
(2, '2021-09-26 03:00:00', 'Ekran görüntüleri alınıyor.', '17:40', 'Sunum');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `image`
--

CREATE TABLE `image` (
  `iid` int(11) NOT NULL,
  `imagename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `image`
--

INSERT INTO `image` (`iid`, `imagename`) VALUES
(1, 'a67bd269-6e18-4f3f-a02c-9fd9c98fdf43.jpg'),
(2, '1b3e700e-5b98-417a-acea-20fc1a0aac61.jpg'),
(8, '7d98d16c-a38b-4ef6-84bb-d211b93e48d7.jpg'),
(9, 'ac3f5b4d-315f-4081-868e-f0a3bbd287f2.jpg'),
(10, '2b87669b-7198-4584-b117-083aa376801fjpeg'),
(11, '1b95472a-b5b3-4d60-b6e8-6082c43d04ee.jpg'),
(12, '46f38ead-8abc-474f-802c-8a6d7f5410ce.jpg'),
(13, 'a6e43d4d-1f30-434e-94f0-de9371e87d5c.jpg'),
(14, 'd2aefc0a-2e53-4273-a73f-817d3056dcf5.jpg'),
(15, 'f86304f0-8975-4b38-8fd0-bd7a56c4aa40jpeg'),
(16, '6b2cbdf0-6454-4be8-9031-c47f536ef79d.jpg'),
(17, '44697e12-7ff6-4925-aa3a-457cb2d9d273.jpg'),
(18, '055065c5-644f-468f-9880-9e7ec7cce86a.jpg'),
(19, '7a2aa9e3-aef0-464a-85df-7efb6850931f.jpg'),
(20, 'a2a7f232-07ec-4439-af1d-372d7438c1d5.jpg'),
(21, '812c6b98-08e7-4ca8-9edd-affa8bb80e4ajpeg'),
(22, 'fa1243b5-5c11-4186-8c9c-c618c75aeed6.jpg'),
(23, 'ce7985c7-1c2f-417c-8ad7-d697234dec22.jpg'),
(24, '5a514979-b42a-4863-96a8-f5735324a224.jpg'),
(25, '280cef76-7610-45d6-83b4-ea9c9e5d4e70.jpg'),
(26, 'f3caeced-81f1-44e9-8c2c-66fd00259adb.jpg'),
(27, '4a20bf2c-547b-48be-b132-7cff9aa3821d.jpg'),
(28, '2047ad94-8896-42c4-9963-3debf0ee2fce.jpg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `lab`
--

CREATE TABLE `lab` (
  `lid` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `labimage_iid` int(11) DEFAULT NULL,
  `pet_pid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `lab`
--

INSERT INTO `lab` (`lid`, `date`, `result`, `type`, `labimage_iid`, `pet_pid`) VALUES
(10, '2021-09-22 22:17:56', 'maymun', 1, 18, 5),
(11, '2021-09-22 22:20:43', 'Sonuc iki', 2, 19, 5),
(12, '2021-09-22 22:39:23', 'dsadsad', 3, 20, 5),
(13, '2021-09-22 22:40:16', 'dsds', 3, 21, 5),
(14, '2021-09-24 01:10:11', 'erkan', 2, 22, 6),
(15, '2021-09-24 11:50:06', 'Röntgen filmi çekildi.', 2, 24, 5),
(16, '2021-09-24 15:55:34', 'Röntgen cekildi', 2, 25, 14),
(17, '2021-09-24 16:49:24', 'Yabancı cisim tespit edildi.', 2, 26, 15),
(18, '2021-09-26 17:36:13', 'Yabancı cisim tespit edildi.', 2, 27, 18);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pet`
--

CREATE TABLE `pet` (
  `pid` int(11) NOT NULL,
  `cbarren` varchar(255) DEFAULT NULL,
  `cbirth` varchar(255) DEFAULT NULL,
  `cchip` int(11) NOT NULL,
  `cgender` varchar(255) DEFAULT NULL,
  `ckind` int(11) NOT NULL,
  `cpatient` varchar(255) DEFAULT NULL,
  `creport` int(11) NOT NULL,
  `p_color_pcid` int(11) DEFAULT NULL,
  `p_race_rid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `pet`
--

INSERT INTO `pet` (`pid`, `cbarren`, `cbirth`, `cchip`, `cgender`, `ckind`, `cpatient`, `creport`, `p_color_pcid`, `p_race_rid`) VALUES
(3, 'Kısır', '1', 1, 'Erkek', 1, 'Şevket', 1, 8, 3),
(4, 'Kısır', '12', 12, 'Erkek', 3, 'd', 12, 6, 22),
(5, 'Kısır', '1', 1, 'Erkek', 2, 'a', 1, 8, 4),
(6, 'Kısır Değil', '5', 5, 'Dişi', 3, 'ewqe', 5, 7, 22),
(7, 'Kısır Değil', '6', 6, 'Dişi', 2, 'weq', 6, 6, 22),
(8, 'Kısır Değil', '2000', 12, 'Dişi', 1, 'Hayvan1', 12, 1, 24),
(9, 'Kısır', '2001', 13, 'Erkek', 3, 'Hayvan2', 13, 8, 25),
(10, 'Kısır', '2013', 14, 'Erkek', 6, 'Hayvan3', 14, 3, 26),
(11, 'Kısır', '2000', 35, 'Erkek', 1, 'Kedicik', 35, 4, 24),
(12, 'Kısır', '2001', 57, 'Erkek', 2, 'Köpekcik', 57, 3, 4),
(13, 'Kısır', '2000', 123, 'Erkek', 1, 'Kedicik', 123, 9, 24),
(14, 'Kısır Değil', '2001', 124, 'Dişi', 2, 'Köpekcik', 124, 3, 4),
(15, 'Kısır', '2013', 123, 'Erkek', 1, 'Sevket', 123, 3, 24),
(16, 'Kısır Değil', '2015', 125, 'Dişi', 2, 'Köpekcik', 125, 3, 4),
(18, 'Kısır', '2021', 89, 'Erkek', 1, 'Sunum Kedi', 89, 10, 28),
(19, 'Kısır Değil', '2021', 90, 'Dişi', 2, 'Sunum Köpek', 90, 10, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pet_color`
--

CREATE TABLE `pet_color` (
  `pcid` int(11) NOT NULL,
  `pcolor` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `pet_color`
--

INSERT INTO `pet_color` (`pcid`, `pcolor`) VALUES
(1, 'Sarı'),
(2, 'Siyah'),
(3, 'Kahve'),
(4, 'Beyaz'),
(5, 'Kırmızı'),
(6, 'Lacivert'),
(7, 'İki Renkli'),
(8, 'Üç Renkli'),
(9, 'Eflatun'),
(10, 'Sunum Renk');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pet_race`
--

CREATE TABLE `pet_race` (
  `rid` int(11) NOT NULL,
  `prace` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `pet_race`
--

INSERT INTO `pet_race` (`rid`, `prace`) VALUES
(3, 'Karabaş'),
(4, 'Köpek'),
(22, 'Dana'),
(23, 'Muhabbet Kuşu'),
(24, 'Tekir'),
(25, 'Papağan'),
(26, 'Maymun'),
(27, 'Maymun'),
(28, 'Van Kedisi');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product`
--

CREATE TABLE `product` (
  `proid` int(11) NOT NULL,
  `buyprice` int(11) DEFAULT NULL,
  `criticalquantity` int(11) DEFAULT NULL,
  `pbpki` varchar(255) DEFAULT NULL,
  `productbarcode` varchar(255) DEFAULT NULL,
  `productcode` varchar(255) DEFAULT NULL,
  `productname` varchar(255) DEFAULT NULL,
  `productstatus` varchar(255) DEFAULT NULL,
  `producttax` int(11) DEFAULT NULL,
  `producttype` int(11) DEFAULT NULL,
  `productunit` int(11) DEFAULT NULL,
  `pspki` varchar(255) DEFAULT NULL,
  `sellprice` int(11) DEFAULT NULL,
  `productcategory_caid` int(11) DEFAULT NULL,
  `productsuppliers_sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `product`
--

INSERT INTO `product` (`proid`, `buyprice`, `criticalquantity`, `pbpki`, `productbarcode`, `productcode`, `productname`, `productstatus`, `producttax`, `producttype`, `productunit`, `pspki`, `sellprice`, `productcategory_caid`, `productsuppliers_sid`) VALUES
(3, 2, 10, 'Dahil', '1', '065879591', 'Ürün1', 'Aktif', 2, 1, 3, 'Dahil', 18, 1, 9),
(5, 1, 10, 'Dahil', '15', '066950253', 'Deneme', 'Aktif', 1, 3, 2, 'Dahil', 4, 1, 9),
(6, 20, 30, 'Dahil', '16', '415929096', 'ÜrünD', 'Aktif', 0, 2, 1, 'Dahil', 25, 1, 9),
(7, 10, 10, 'Dahil', '87', '438895643', 'Pahalı Ürün', 'Aktif', 0, 2, 1, 'Dahil', 200, 1, 9),
(8, 100, 30, 'Dahil', '123', '473660874', 'Kuduz Aşısı', 'Aktif', 0, 5, 3, 'Dahil', 120, 1, 11),
(12, 10, 30, 'Dahil Degil', '4564', '490276490', 'a', 'Pasif', 0, 1, 2, 'Dahil Degil', 15, 1, 12),
(13, 150, 10, 'Dahil', '4564564', '490304235', 'aassaa', 'Aktif', 1, 1, 3, 'Dahil', 200, 1, 12),
(14, 150, 30, 'Dahil', '13', '665385602', 'Sunum Ürün', 'Aktif', 0, 0, 1, 'Dahil', 200, 1, 13);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_stock`
--

CREATE TABLE `product_stock` (
  `psid` int(11) NOT NULL,
  `opstatus` bit(1) DEFAULT NULL,
  `prodid` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `waid` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `product_stock`
--

INSERT INTO `product_stock` (`psid`, `opstatus`, `prodid`, `stock`, `waid`, `date`) VALUES
(1, b'1', 3, 10, 1, '2021-09-23 00:49:48'),
(2, b'1', 3, 20, 1, '2021-09-23 19:45:44'),
(3, b'1', 6, 50, 1, '2021-09-23 19:53:18'),
(4, b'0', 6, 49, 1, '2021-09-23 20:23:27'),
(5, b'0', 5, -1, 1, '2021-09-23 20:23:54'),
(6, b'0', 3, 19, 1, '2021-09-23 21:26:58'),
(7, b'1', 5, 11, 1, '2021-09-23 21:32:21'),
(8, b'0', 5, 10, 1, '2021-09-23 21:46:21'),
(9, b'1', 3, 31, 1, '2021-09-23 21:50:44'),
(10, b'1', 7, 5, 1, '2021-09-24 02:15:33'),
(11, b'0', 7, 4, 1, '2021-09-24 02:16:01'),
(12, b'1', 8, 10, 4, '2021-09-24 11:55:00'),
(13, b'1', 8, 12, 4, '2021-09-24 11:56:00'),
(14, b'1', 5, 20, 1, '2021-09-24 11:58:39'),
(15, b'0', 8, 11, 4, '2021-09-24 11:59:57'),
(16, b'0', 3, 30, 1, '2021-09-24 12:03:37'),
(17, b'0', 8, -1, 1, '2021-09-24 12:05:14'),
(18, b'0', 7, 3, 1, '2021-09-24 12:07:29'),
(19, b'0', 8, -2, 1, '2021-09-24 12:12:30'),
(20, b'0', 5, 19, 1, '2021-09-24 12:30:01'),
(21, b'0', 3, 29, 1, '2021-09-24 12:58:27'),
(22, b'0', 8, -3, 1, '2021-09-24 13:04:10'),
(23, b'1', 8, 45, 1, '2021-09-24 15:54:05'),
(24, b'0', 8, 44, 1, '2021-09-24 15:54:30'),
(25, b'1', 3, 25, 5, '2021-09-24 16:50:11'),
(26, b'1', 8, 15, 5, '2021-09-24 16:50:58'),
(27, b'0', 8, 14, 5, '2021-09-24 16:51:24'),
(28, b'1', 14, 50, 5, '2021-09-26 17:17:22'),
(29, b'1', 14, 85, 5, '2021-09-26 17:20:18'),
(30, b'0', 14, 84, 5, '2021-09-26 17:23:38');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `role`
--

CREATE TABLE `role` (
  `rid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `role`
--

INSERT INTO `role` (`rid`, `name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_DOKTOR'),
(3, 'ROLE_SEKRETER');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `schedule_calendar`
--

CREATE TABLE `schedule_calendar` (
  `sid` int(11) NOT NULL,
  `bg_color` varchar(255) DEFAULT NULL,
  `border_color` varchar(255) DEFAULT NULL,
  `calendar_id` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `drag_bg_color` varchar(255) DEFAULT NULL,
  `due_date_class` varchar(255) DEFAULT NULL,
  `end` varchar(255) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL,
  `is_all_day` bit(1) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `raw` varchar(255) DEFAULT NULL,
  `start` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `schedule_calendar`
--

INSERT INTO `schedule_calendar` (`sid`, `bg_color`, `border_color`, `calendar_id`, `category`, `color`, `drag_bg_color`, `due_date_class`, `end`, `id`, `is_all_day`, `location`, `raw`, `start`, `state`, `title`) VALUES
(5, '#ff3333', '#ff3333', '2', 'time', '#ffffff', '#ff3333', '', 'Fri Sep 24 2021 11:00:00 GMT+0300 (GMT+03:00)', '8cfcde74-cbb9-530a-8481-f6a1b3435bd8', b'0', 'İstanbul', 'public', 'Fri Sep 24 2021 08:30:00 GMT+0300 (GMT+03:00)', 'Açık', 'Köpek'),
(6, '#9e5fff', '#9e5fff', '1', 'time', '#ffffff', '#9e5fff', '', 'Thu Sep 23 2021 05:00:00 GMT+0300 (GMT+03:00)', 'c6175343-24dc-52b0-87d0-2b8fb1cffff1', b'0', 'İstanbul', 'public', 'Thu Sep 23 2021 01:00:00 GMT+0300 (GMT+03:00)', 'Meşkul', 'Kedi');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `suppliers`
--

CREATE TABLE `suppliers` (
  `sid` int(11) NOT NULL,
  `semail` varchar(255) DEFAULT NULL,
  `sname` varchar(255) DEFAULT NULL,
  `sphone` varchar(255) DEFAULT NULL,
  `sstatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `suppliers`
--

INSERT INTO `suppliers` (`sid`, `semail`, `sname`, `sphone`, `sstatus`) VALUES
(9, 'tedarikci@mail.com', 'Tedarikçi', '213', 'Aktif'),
(11, 'tedarikci2@mail.com', 'Tedarikçi2', '123', 'Aktif'),
(12, 'sunum@mail.com', 'SunumTedarikci', '123', 'Aktif'),
(13, 'sunumtedarikci@mail.com', 'Sunum Tedarikçi', '555', 'Aktif');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token_expired` bit(1) NOT NULL,
  `useremail` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userphone` varchar(255) DEFAULT NULL,
  `userstatus` varchar(255) DEFAULT NULL,
  `usersurname` varchar(255) DEFAULT NULL,
  `userimage_iid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`uid`, `enabled`, `password`, `token_expired`, `useremail`, `username`, `userphone`, `userstatus`, `usersurname`, `userimage_iid`) VALUES
(6, b'1', '$2a$10$OO9T8DZF.sLsaton9YClPOLq8RQ/pNApsaH3alMnE7eXuH3T95lJ.', b'1', 'serkan@mail.com', 'Serkan', '4564564', 'Aktif', 'Bilir', 9),
(7, b'1', '$2a$10$Sf7Si7GEDio/Qj06J/kNUeEGdrgTPff2E87j5t2MBcJkk/VgCC.0u', b'1', 'erkan@mail.com', 'Erkan', '4564564', 'Aktif', 'Bilmez', 23),
(8, b'1', '$2a$10$YuUUTBJuFfERFoLRxE4c1eume2RGc5tVUI1V1BIsb4vuDn3RD4pPC', b'1', 'sunumedit@mail.com', 'Sunum', '424242', 'Aktif', 'Sunum', 28);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users_roles`
--

CREATE TABLE `users_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users_roles`
--

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES
(7, 1),
(6, 1),
(8, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ware_house`
--

CREATE TABLE `ware_house` (
  `wid` int(11) NOT NULL,
  `wname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `ware_house`
--

INSERT INTO `ware_house` (`wid`, `wname`) VALUES
(1, 'AnaDepo'),
(6, 'Depo'),
(5, 'SunumDepo'),
(4, 'YedekDepo');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`);

--
-- Tablo için indeksler `box_action`
--
ALTER TABLE `box_action`
  ADD PRIMARY KEY (`boid`);

--
-- Tablo için indeksler `calendar_info`
--
ALTER TABLE `calendar_info`
  ADD PRIMARY KEY (`cid`);

--
-- Tablo için indeksler `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`caid`);

--
-- Tablo için indeksler `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cid`);

--
-- Tablo için indeksler `customer_pets`
--
ALTER TABLE `customer_pets`
  ADD UNIQUE KEY `UK_r6qf8vn2anug1l2qhbhbve51u` (`pets_pid`),
  ADD KEY `FKllnl1jf0gi9vm4lmrbadd9xqk` (`customer_cid`);

--
-- Tablo için indeksler `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`did`);

--
-- Tablo için indeksler `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`iid`);

--
-- Tablo için indeksler `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `FKk15b8amlpqkxa187gltm2u8md` (`labimage_iid`),
  ADD KEY `FKs8u0173ye4ar380cieo4rjnwv` (`pet_pid`);

--
-- Tablo için indeksler `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `FK9rkr0hhvm3b9lhimt3soqk8bx` (`p_color_pcid`),
  ADD KEY `FKqg4g9tv24c23vq7gvmvywvy2g` (`p_race_rid`);

--
-- Tablo için indeksler `pet_color`
--
ALTER TABLE `pet_color`
  ADD PRIMARY KEY (`pcid`);

--
-- Tablo için indeksler `pet_race`
--
ALTER TABLE `pet_race`
  ADD PRIMARY KEY (`rid`);

--
-- Tablo için indeksler `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`proid`),
  ADD UNIQUE KEY `UK_pq7dm8s88s7isryltijs6mxg3` (`productbarcode`),
  ADD UNIQUE KEY `UK_94qeefjolf5hhsm94gcuxnbdk` (`productcode`),
  ADD UNIQUE KEY `UK_6aqixgrjm2rrw2is6ol1nxq1b` (`productname`),
  ADD KEY `FKr2xvlbndysgnxvx4mo2kt413f` (`productcategory_caid`),
  ADD KEY `FK3b7ylbrvhwgqfou0moxc2stka` (`productsuppliers_sid`);

--
-- Tablo için indeksler `product_stock`
--
ALTER TABLE `product_stock`
  ADD PRIMARY KEY (`psid`);

--
-- Tablo için indeksler `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`rid`);

--
-- Tablo için indeksler `schedule_calendar`
--
ALTER TABLE `schedule_calendar`
  ADD PRIMARY KEY (`sid`);

--
-- Tablo için indeksler `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`sid`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `FK9orlfdcis7tc3ola7trpvit5t` (`userimage_iid`);

--
-- Tablo için indeksler `users_roles`
--
ALTER TABLE `users_roles`
  ADD KEY `FKt4v0rrweyk393bdgt107vdx0x` (`role_id`),
  ADD KEY `FK2o0jvgh89lemvvo17cbqvdxaa` (`user_id`);

--
-- Tablo için indeksler `ware_house`
--
ALTER TABLE `ware_house`
  ADD PRIMARY KEY (`wid`),
  ADD UNIQUE KEY `UK_o6b4n3xishp8n0wx6awao3vl5` (`wname`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `box_action`
--
ALTER TABLE `box_action`
  MODIFY `boid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `calendar_info`
--
ALTER TABLE `calendar_info`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `category`
--
ALTER TABLE `category`
  MODIFY `caid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `customer`
--
ALTER TABLE `customer`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Tablo için AUTO_INCREMENT değeri `diary`
--
ALTER TABLE `diary`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `image`
--
ALTER TABLE `image`
  MODIFY `iid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Tablo için AUTO_INCREMENT değeri `lab`
--
ALTER TABLE `lab`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Tablo için AUTO_INCREMENT değeri `pet`
--
ALTER TABLE `pet`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Tablo için AUTO_INCREMENT değeri `pet_color`
--
ALTER TABLE `pet_color`
  MODIFY `pcid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `pet_race`
--
ALTER TABLE `pet_race`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Tablo için AUTO_INCREMENT değeri `product`
--
ALTER TABLE `product`
  MODIFY `proid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Tablo için AUTO_INCREMENT değeri `product_stock`
--
ALTER TABLE `product_stock`
  MODIFY `psid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Tablo için AUTO_INCREMENT değeri `role`
--
ALTER TABLE `role`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `schedule_calendar`
--
ALTER TABLE `schedule_calendar`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `ware_house`
--
ALTER TABLE `ware_house`
  MODIFY `wid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `customer_pets`
--
ALTER TABLE `customer_pets`
  ADD CONSTRAINT `FK52sudwlkiavtpmardj9dxqq7t` FOREIGN KEY (`pets_pid`) REFERENCES `pet` (`pid`),
  ADD CONSTRAINT `FKllnl1jf0gi9vm4lmrbadd9xqk` FOREIGN KEY (`customer_cid`) REFERENCES `customer` (`cid`);

--
-- Tablo kısıtlamaları `lab`
--
ALTER TABLE `lab`
  ADD CONSTRAINT `FKk15b8amlpqkxa187gltm2u8md` FOREIGN KEY (`labimage_iid`) REFERENCES `image` (`iid`),
  ADD CONSTRAINT `FKs8u0173ye4ar380cieo4rjnwv` FOREIGN KEY (`pet_pid`) REFERENCES `pet` (`pid`);

--
-- Tablo kısıtlamaları `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `FK9rkr0hhvm3b9lhimt3soqk8bx` FOREIGN KEY (`p_color_pcid`) REFERENCES `pet_color` (`pcid`),
  ADD CONSTRAINT `FKqg4g9tv24c23vq7gvmvywvy2g` FOREIGN KEY (`p_race_rid`) REFERENCES `pet_race` (`rid`);

--
-- Tablo kısıtlamaları `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK3b7ylbrvhwgqfou0moxc2stka` FOREIGN KEY (`productsuppliers_sid`) REFERENCES `suppliers` (`sid`),
  ADD CONSTRAINT `FKr2xvlbndysgnxvx4mo2kt413f` FOREIGN KEY (`productcategory_caid`) REFERENCES `category` (`caid`);

--
-- Tablo kısıtlamaları `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK9orlfdcis7tc3ola7trpvit5t` FOREIGN KEY (`userimage_iid`) REFERENCES `image` (`iid`);

--
-- Tablo kısıtlamaları `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `FKt4v0rrweyk393bdgt107vdx0x` FOREIGN KEY (`role_id`) REFERENCES `role` (`rid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
