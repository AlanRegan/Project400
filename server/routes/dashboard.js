const express = require("express");
const app = express();
const authorize = require("../middleware/jwtAuthorization");
const pool = require("../db");

router.get("/dash", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT name FROM users WHERE id = $1",
      [req.user.id] // payload data
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = app;