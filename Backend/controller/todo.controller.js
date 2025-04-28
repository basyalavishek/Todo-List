import Todo from "../Model/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });

  // through req.body.text and req.body.completed, the text and completed is stored in backend 'text' and 'completed' inside 'todo' and that saved information is saved to database through 'todo.save'

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "todo created successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error occured during creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "todo fetched successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occured during fetching " });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
    });
    res.status(201).json({ message: "todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occured during updation " });
  }
};


export const deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "todo deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error occured during deletion " });
    }
  };