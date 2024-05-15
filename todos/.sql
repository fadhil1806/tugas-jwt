create table users (                                                      
    id int primary key,                                                       
    name varchar (80) not null,                                               
    username varchar (25) not null primary key,                               
    password varchar (100) not null,                                          
    email varchar (35),                                                       
    createdAt timestamp default current_timestamp,                            
    updateAt timestamp default current_timestamp on update current_timestamp  
);                                                                        

CREATE TABLE jobs (
    id_user INT,
    id varchar(25) PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    status ENUM('pending', 'process', 'success') NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);