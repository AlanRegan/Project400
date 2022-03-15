const express = require("express");
const app = express();
const authorize = require("../middleware/jwtAuthorization");
const pool = require("../db");

app.get("/", authorize, async (req, res) => {
    try {
        const leaderboard = await pool.query(`select u.name, sum(points) from friends as f inner join task as t on t.user_id = f.friend_id inner join users as u on f.friend_id = u.id 
        where f.user_id = $1 and t.completestatus is not null 
        group by u.name
        `,
        [req.user.id]);
        res.json(leaderboard.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  // add friend 
app.post("/", authorize, async(req, res) => {
    try{
        const { friend_id } = req.body;
        const newFriend = await pool.query
            (`INSERT INTO friends (user_id, friend_id) VALUES($1, $2) RETURNING *`,
            [req.user.id, friend_id]
        );
        res.json(newFriend.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});



  module.exports = app;