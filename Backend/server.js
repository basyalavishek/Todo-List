import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db_connect.js";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";


// middlewares
app.use(express.json()); // allows us to accept JSON data in the req.body


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;


app.use("/todo", todoRoute); //"For any route that starts with /todo, use the routes defined in todoRoute."
app.use("/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
