import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorization.js";

const router = express.Router();

router.post("/create", authenticate, createTodo); // When someone sends a POST request to /create, run the createTodo function
router.get("/fetch",authenticate, getTodos);
router.put("/update/:id",authenticate, updateTodo);
router.delete("/delete/:id",authenticate, deleteTodo);

export default router;
