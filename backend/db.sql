#CREATE DATABASE auction;

CREATE USER auction@localhost IDENTIFIED BY 'auction';
GRANT ALL PRIVILEGES ON auction.* to auction@localhost with grant option;

USE auction;

CREATE TABLE IF NOT EXISTS bids (
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20),
    bid INT(10) NOT NULL,
    bid_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);