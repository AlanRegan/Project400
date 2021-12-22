CREATE DATABASE tasks400;

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    deadline date,
    priority VARCHAR(8)
);

