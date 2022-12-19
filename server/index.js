require("dotenv").config
const express = require("express");
const db = require("./db");
const Todo = require("./todo");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/", async (req, res) => {

  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Message not found" });
    }
    console.log(todo);
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
});
const path = require("path")
app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"build")))
  res.sendFile(path.resolve(__dirname,"build","index.html"));
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
