import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.js';

const router = express.Router();

router.post("/create",createTodo) // When someone sends a POST request to /create, run the createTodo function
router.get("/fetch",getTodos);
router.put("/update/:id",updateTodo);
router.delete("/delete/:id",deleteTodo)

export default router;