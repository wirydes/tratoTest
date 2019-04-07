CREATE DATABASE tratoTest;
use tratoTest;
CREATE TABLE TestUser ( id int unsigned not null auto_increment PRIMARY KEY, name varchar(100) not null, email varchar(100) not null unique,isActive bool not null, password varchar(100) not null ); 
INSERT INTO TestUser ( name, email, isActive, password) VALUES ('Aurio Robles', 'alejandro.ro94@gmail.com', true, 'password' );
