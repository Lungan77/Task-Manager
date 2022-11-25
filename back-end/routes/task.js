import Express from "express";
import { getTasks, postTasks, putTasks, deleteTasks } from "../controllers/task.js";
import protect from "../middleware/authMiddleware.js";

const route = Express.Router();

route.get("/", protect, getTasks);
route.post('/', protect, postTasks);
route.put('/updatetask/:id', protect, putTasks);
route.delete('/delete/:id',protect, deleteTasks);


export default route;