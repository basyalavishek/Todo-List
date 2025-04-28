import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db_connect.js";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// middlewares
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors({
origin:process.env.FRONTEND_URL, // from this frontend_url your frontend talks to your backend
credentials:true,
// Allow cookies to travel between frontend and backend.

methods:"GET , POST , PUT , DELETE",
allowedHeaders:["Content-Type","Authorization"]  // When the frontend sends a request to the backend, it is allowed to send these headers in the request  
})) 

app.use("/todo", todoRoute); //"For any route that starts with /todo, use the routes defined in todoRoute."
app.use("/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
