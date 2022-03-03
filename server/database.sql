CREATE DATABASE tasks400;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE module(
   module_id SERIAL PRIMARY KEY,
   user_id UUID,
   module_name VARCHAR(255),
   ca_total double precision,
   module_colour VARCHAR(255),
   FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    user_id UUID,
    description VARCHAR(255),
    deadline date,
    priority VARCHAR(8),
    caValue double precision,
    module_id INT,
    completeStatus VARCHAR(255),
    grade double precision,
   FOREIGN KEY (user_id) REFERENCES users(id),
   CONSTRAINT fk_module
      FOREIGN KEY(module_id) 
      REFERENCES module(module_id)
);


