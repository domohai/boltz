-- add two cols to user table
ALTER TABLE user
ADD COLUMN service_point_id INT NULL,
ADD COLUMN collection_point_id INT NULL,
ADD FOREIGN KEY (service_point_id) REFERENCES service_point(id) ON DELETE SET NULL,
ADD FOREIGN KEY (collection_point_id) REFERENCES collection_point(id) ON DELETE SET NULL;

-- add 'city' column to collection_point table
ALTER TABLE collection_point
ADD COLUMN city VARCHAR(255) NOT NULL;

-- ALTER TABLE collection_point
-- MODIFY COLUMN user_id INT DEFAULT NULL;
-- ALTER TABLE service_point
-- MODIFY COLUMN user_id INT DEFAULT NULL;
ALTER TABLE service_point
MODIFY COLUMN collection_point_id INT DEFAULT NULL;

-- insert file 'insertCollectionPoint.sql'
-- insert file 'insertServicePoint.sql'
-- add accounts to DB 

SET SQL_SAFE_UPDATES = 0;
-- set collection_point_id for service_point
UPDATE service_point sp
JOIN collection_point cp ON sp.city = cp.city
SET sp.collection_point_id = cp.id;

-- set manager for collection_point
UPDATE user u
JOIN collection_point cp ON u.name = cp.city
SET u.collection_point_id = cp.id
WHERE u.role = 'cp_manager';
-- set manager for service_point
UPDATE user u
JOIN service_point sp ON u.name = sp.name
SET u.service_point_id = sp.id
WHERE u.role = 'sp_manager';

# drop user_id
# SHOW CREATE TABLE collection_point;
# ALTER TABLE collection_point
# DROP FOREIGN KEY collection_point_ibfk_1;
# ALTER TABLE collection_point
# DROP COLUMN user_id;
#
# SHOW CREATE TABLE service_point;
# ALTER TABLE service_point
# DROP FOREIGN KEY service_point_ibfk_1;
# ALTER TABLE service_point
# DROP COLUMN user_id;

# UPDATE user
# SET collection_point_id = 1
# WHERE email IN ('cp_hai@boltz.com', 'cp_hiep@boltz.com', 'cp_haiz@boltz.com', 'cp_duc@boltz.com');
#
# UPDATE user
# SET collection_point_id = 1
# WHERE email IN ('cs_hai@boltz.com', 'cs_hiep@boltz.com', 'cs_haiz@boltz.com', 'cs_duc@boltz.com');

INSERT INTO collection_point (name, city, address) VALUES ('DTK Thanh Tri', 'Ha Noi', 'Thanh Tri Ha Noi');
UPDATE user SET user.collection_point_id = LAST_INSERT_ID() WHERE email IN ('cp_hai@boltz.com', 'cs_hai@boltz.com');

INSERT INTO collection_point (name, city, address) VALUES ('DTK Thai Binh', 'Thai Binh', 'Tinh Thai Binh');
UPDATE user SET user.collection_point_id = LAST_INSERT_ID() WHERE email IN ('cp_hiep@boltz.com', 'cs_hiep@boltz.com');

INSERT INTO collection_point (name, city, address) VALUES ('DTK Ninh Binh', 'Ninh Binh', 'Tinh Ninh Binh');
UPDATE user SET user.collection_point_id = LAST_INSERT_ID() WHERE email IN ('cp_haiz@boltz.com', 'cs_haiz@boltz.com');

INSERT INTO collection_point (name, city, address) VALUES ('DTK Tuyen Quang', 'Tuyen Quang', 'Tinh Tuyen Quang');
UPDATE user SET user.collection_point_id = LAST_INSERT_ID() WHERE email IN ('cp_duc@boltz.com', 'cs_duc@boltz.com');

-- Modify start_time to be NOT NULL
ALTER TABLE parcel
MODIFY COLUMN start_time TIMESTAMP NOT NULL;
-- Modify end_time to have a default value of NULL
ALTER TABLE parcel
MODIFY COLUMN end_time TIMESTAMP DEFAULT NULL;

-- Add new columns: name, sender_id, and receiver_id
ALTER TABLE parcel
ADD COLUMN name VARCHAR(255),
ADD COLUMN sender_id INT,
ADD COLUMN receiver_id INT,
ADD COLUMN notes TEXT DEFAULT NULL,
ADD COLUMN weight INT NOT NULL,
ADD COLUMN type enum('docs', 'package') DEFAULT 'package',
ADD COLUMN value INT DEFAULT 0,
MODIFY COLUMN cost INT NOT NULL,
MODIFY COLUMN moving_to ENUM('src_collection_p','des_collection_p','des_service_p') DEFAULT NULL,
MODIFY COLUMN status enum('Chờ xử lý','Đang vận chuyển','Chờ trả hàng','Đã trả hàng','Đã huỷ') DEFAULT 'Chờ xử lý',
ADD FOREIGN KEY (sender_id) REFERENCES person(id) ON DELETE SET NULL,
ADD FOREIGN KEY (receiver_id) REFERENCES person(id) ON DELETE SET NULL;

