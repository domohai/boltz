ALTER TABLE user
ADD COLUMN service_point_id INT NULL,
ADD COLUMN collection_point_id INT NULL,
ADD FOREIGN KEY (service_point_id) REFERENCES service_point(id) ON DELETE SET NULL,
ADD FOREIGN KEY (collection_point_id) REFERENCES collection_point(id) ON DELETE SET NULL;

ALTER TABLE collection_point
ADD COLUMN city VARCHAR(255) NOT NULL;
ALTER TABLE collection_point
MODIFY COLUMN user_id INT DEFAULT NULL;

ALTER TABLE service_point
MODIFY COLUMN user_id INT DEFAULT NULL;
ALTER TABLE service_point
MODIFY COLUMN collection_point_id INT DEFAULT NULL;

# insert file 'insertCollectionPoint.sql'
# insert file 'insertServicePoint.sql'

UPDATE service_point sp
JOIN collection_point cp ON sp.city = cp.city
SET sp.collection_point_id = cp.id;

UPDATE user u
JOIN collection_point cp ON u.name = cp.city
SET u.collection_point_id = cp.id
WHERE u.role = 'cp_manager';

UPDATE user u
JOIN service_point sp ON u.name = sp.name
SET u.service_point_id = sp.id
WHERE u.role = 'sp_manager';

# drop user_id
SHOW CREATE TABLE collection_point;
ALTER TABLE collection_point
DROP FOREIGN KEY collection_point_ibfk_1;
ALTER TABLE collection_point
DROP COLUMN user_id;

SHOW CREATE TABLE service_point;
ALTER TABLE service_point
DROP FOREIGN KEY service_point_ibfk_1;
ALTER TABLE service_point
DROP COLUMN user_id;
