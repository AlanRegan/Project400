const express = require("express");
const app = express();
const authorize = require("../middleware/jwtAuthorization");
const pool = require("../db");

// create module
app.post("/", authorize, async(req, res) => {
    try{
        const { module_name, ca_total, module_colour} = req.body;
        const newModule = await pool.query
            ("INSERT INTO module (user_id, module_name, ca_total, module_colour) VALUES($1, $2, $3, $4) RETURNING *",
            [req.user.id, module_name, ca_total, module_colour]
        );
        res.json(newModule.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all modules
app.get("/", authorize, async(req, res) => {
    try {
        const allModules = await pool.query("SELECT * FROM module as m LEFT JOIN users as u ON u.id = m.user_id WHERE u.id = $1",
        [req.user.id]);
        res.json(allModules.rows);
    } catch (err) {
        console.error("Error getting modules");
    }
});

// get all modules for overview COME BACK TO THIS
app.get("/modulesoverview", authorize, async (req, res) => {
    try {
        const allModules = await pool.query(`SELECT m.module_id, module_name, ca_total, module_colour,
        SUM( 
        CASE WHEN t.completestatus IS NULL 
        THEN 0 ELSE cavalue END) AS currentlycompleted,
        SUM(t.grade) AS grade FROM task AS t
        FULL OUTER JOIN module AS m
        ON m.module_id = t.module_id
		WHERE m.user_id = $1
        GROUP BY m.module_id
        `,
        [req.user.id]);
        res.json(allModules.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get specific task
app.get("/modules/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query
        ("SELECT * FROM task WHERE module_id = $1", [id])
        res.json(task.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;