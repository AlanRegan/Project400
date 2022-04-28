const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const { json } = require("express");
const authorize = require("../middleware/jwtAuthorization");
//const router = require("express").Router();

// create task 
app.post("/", authorize, async(req, res) => {
    try{
        const { description, deadline, priority, caValue, module_id } = req.body;
        const points = caValue / 10;
        const newTask = await pool.query
            ("INSERT INTO task (user_id, description, deadline, priority, caValue, module_id, points) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [req.user.id, description, deadline, priority, caValue, module_id, points]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all tasks
app.get("/", authorize, async(req, res) => {
    try {
        const allTasks = await pool.query
        ("SELECT * FROM task as t INNER JOIN module as m on t.module_id = m.module_id where t.user_id = $1 AND completestatus <> 'Complete' OR completestatus is null"
        ,[req.user.id]
        );
        for (var i = 0; i < allTasks.rows.length; i++) {
        var row = allTasks.rows[i];
        var todaysDate = new Date()
        var deadlineCorrectFormat = new Date(row.deadline);
        var daysLeft = (deadlineCorrectFormat - todaysDate)/(1000*3600*24)
        console.log(daysLeft);
        row.daysLeft = daysLeft.toFixed(0);;      
    }
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all tasks due soon
app.get("/soon", authorize, async(req, res) => {
    try {
        const allTasks = await pool.query
        ("SELECT * FROM task as t INNER JOIN module as m on t.module_id = m.module_id where t.user_id = $1 AND completestatus is null order by deadline"
        ,[req.user.id]
        );
        for (var i = 0; i < allTasks.rows.length; i++) {
        var row = allTasks.rows[i];
        var todaysDate = new Date()
        var deadlineCorrectFormat = new Date(row.deadline);
        var daysLeft = (deadlineCorrectFormat - todaysDate)/(1000*3600*24)
        console.log(daysLeft);
        row.daysLeft = daysLeft.toFixed(0);;      
    }
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all high priority tasks
app.get("/highpriority", authorize, async(req, res) => {
    try {
        const prioritizedTasks = await pool.query("SELECT * FROM task as t INNER JOIN module as m on t.module_id = m.module_id AND m.user_id = $1 ORDER BY (case priority when 'High' then 1 when 'Medium' then 2 when 'Low' then 3 end) fetch first 3 rows only"
        ,
        [req.user.id]
        );
        for (var i = 0; i < prioritizedTasks.rows.length; i++) {
            var row = prioritizedTasks.rows[i];
            var todaysDate = new Date()
            var deadlineCorrectFormat = new Date(row.deadline);
            var daysLeft = (deadlineCorrectFormat - todaysDate)/(1000*3600*24)
            console.log(daysLeft);
            row.daysLeft = daysLeft.toFixed(0);;      
        }
        res.json(prioritizedTasks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get specific task
app.get("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query
        ("SELECT * FROM task WHERE task_id = $1", [id])
        res.json(task.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});

// edit task - update
app.put("/:id", authorize, async(req, res) => {
    try {
        const { id } = req.params;
        const { description, deadline, priority, caValue } = req.body;
        const updateTask = await pool.query
        ("UPDATE task SET description = $1 deadline = $2 priority = $3 caValue = $4 WHERE task_id = $5 AND user_id = $6",
        [description, deadline, priority, caValue, id, req.user.id]
        );
        res.json("Task updated!")
    } catch (err) {
        console.error(err.message);
    }
});

// complete task - update
app.put("/completetask/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { completeStatus } = req.body;
        const updateTask = await pool.query
        ("UPDATE task SET completeStatus = $1 WHERE task_id = $2",
        [completeStatus, id]
        );
        res.json("Task updated!")
    } catch (err) {
        console.error(err.message);
    }
});

// delete task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query
        ("DELETE FROM task WHERE task_id = $1", [id]
        );
        res.json("Task deleted!");
    } catch (err) {
        console.error(err.message);
    }
});
//#endregion tasks

module.exports = app;