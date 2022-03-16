const express = require("express");
const app = express();
const cors = require("cors");
//const pool = require("./db");
const { json } = require("express");

// middleware
app.use(cors());
app.use(express.json()); // req.body

app.use("/tasks", require("./routes/tasks"));
app.use("/user", require("./routes/user"));
app.use("/modules", require("./routes/modules"));
app.use("/grades", require("./routes/grades"));
app.use("/events", require("./routes/events"));
app.use("/friends", require("./routes/friends"));

app.listen(5000, () => {
    console.log("server has started on port 5000");
})