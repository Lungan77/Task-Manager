import Express from "express";
import { register, login, profile } from "../controllers/user.js";
import protect from "../middleware/authMiddleware.js";

const route = Express.Router();

route.post('/register', register)
route.post('/login', login)
route.get('/profile', protect, profile)

export default route;