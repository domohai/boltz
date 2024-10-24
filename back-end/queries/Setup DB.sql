# CREATE DATABASE web_56 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
# USE web_56;

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('leader','cp_manager','sp_manager','collection_staff','service_staff')
);

CREATE TABLE `collection_point` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `user_id` int,
   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE `service_point` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `user_id` int,
   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
  `collection_point_id` int,
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
