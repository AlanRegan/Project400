CREATE DATABASE tasks400;

CREATE TABLE module(
   module_id SERIAL PRIMARY KEY,
   module_name VARCHAR(255),
   ca_total double precision
);

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    deadline date,
    priority VARCHAR(8),
    caValue double precision,
    module_id INT,
    CONSTRAINT fk_module
      FOREIGN KEY(module_id) 
      REFERENCES module(module_id)
);


