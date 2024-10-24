const express = require('express');
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const app = express();
PORT = 3000;

app.use(express.json());

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Invalid Inputs"
        });
        return;
    }
    // put in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.json({
        msg: "Todo Created"
    });
})

app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({
        todos
    });
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Invalid Inputs"
        });
        return;
    }
    await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    });
    res.json({
        msg: "Todo mark as completed"
    });
})

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})