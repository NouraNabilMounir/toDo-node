const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let todos = [];
let idCounter = 1;


app.post("/api/todos", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const newTodo = { id: idCounter++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json({ message: "ToDo item created successfully", todo: newTodo });
});

app.get("/api/todos", (req, res) => {
    res.json(todos);
});

app.put("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ message: "ToDo item not found" });
    }
    todo.title = title !== undefined ? title : todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json({ message: "ToDo item updated successfully", todo });
});

app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: "ToDo item not found" });
    }
    todos.splice(index, 1);
    res.json({ message: "ToDo item deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
