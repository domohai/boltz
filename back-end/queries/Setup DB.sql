# CREATE DATABASE web_56 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
# USE web_56;

SELECT COUNT(*) FROM user where role = 'sp_manager' and service_point_id is null;
# select count(*) from service_point where collection_point_id is null;

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('leader','cp_manager','sp_manager','collection_staff','service_staff'),
  `service_point_id` int DEFAULT NULL,
   FOREIGN KEY (service_point_id) REFERENCES service_point(id) ON DELETE SET NULL
  `collection_point_id` int DEFAULT NULL,
   FOREIGN KEY (collection_point_id) REFERENCES collection_point(id) ON DELETE SET NULL
);

CREATE TABLE `collection_point` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
);

CREATE TABLE `service_point` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `collection_point_id` int DEFAULT NULL,
   FOREIGN KEY (collection_point_id) REFERENCES collection_point(id) ON DELETE SET NULL
);

CREATE TABLE `parcel` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `src_service_p` int,
  `src_collection_p` int,
  `des_collection_p` int,
  `des_service_p` int,
   FOREIGN KEY (src_service_p) REFERENCES service_point(id) ON DELETE SET NULL,
   FOREIGN KEY (src_collection_p) REFERENCES collection_point(id) ON DELETE SET NULL,
   FOREIGN KEY (des_service_p) REFERENCES service_point(id) ON DELETE SET NULL,
   FOREIGN KEY (des_collection_p) REFERENCES collection_point(id) ON DELETE SET NULL,
  `curr_point` enum('src_service_p','src_collection_p','des_collection_p','des_service_p'),
  `moving_to` enum('src_collection_p','des_collection_p','des_service_p','null'),
  `status` enum('Chờ xử lý','Đang vận chuyển','Chờ trả hàng','Đã trả hàng','Đã huỷ'),
  `cost` double NOT NULL,
  `start_time` timestamp,
  `end_time` timestamp
);
