DROP TABLE sys_user;
CREATE TABLE sys_user (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(10) NOT NULL,
    user_phone VARCHAR(11) NOT NULL,
    user_email VARCHAR(30) NULL,
    user_pwd VARCHAR(20) NOT NULL
);