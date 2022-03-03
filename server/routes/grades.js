const express = require("express");
const app = express();
const authorize = require("../middleware/jwtAuthorization");
const pool = require("../db");

// get all completed tasks for grading
app.get("/", authorize, async (req, res) => {
    try {
        const allModules = await pool.query(`SELECT * FROM task WHERE user_id = $1 AND completestatus = 'Complete'`,
        [req.user.id]);
        res.json(allModules.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// update grade
app.put("/:id", authorize, async(req, res) => {
    try {
        const { id } = req.params;
        const { grade } = req.body;
        const updateGrade = await pool.query
        ("UPDATE task SET grade = $1 WHERE task_id = $2 AND user_id = $3",
        [grade, id, req.user.id]
        );
        res.json("Task updated!")
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
