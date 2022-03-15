const express = require("express");
const app = express();
const authorize = require("../middleware/jwtAuthorization");
const pool = require("../db");

app.get("/", async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT * FROM events"
              );    
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


// create event 
app.post("/", authorize, async(req, res) => {
    try{
        const { task_id, title, start, end } = req.body;
        const newTask = await pool.query
            (`INSERT INTO events (user_id, task_id, title, start, "end") VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [req.user.id, task_id, title, start, end]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

  module.exports = app;