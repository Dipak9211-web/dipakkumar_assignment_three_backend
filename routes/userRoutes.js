import express from 'express'

const router = express.Router();
import { createUser, getAllUsers, removeUser, updateUser } from '../controllers/UserController.js';


router.post("/users", createUser);
router.get("/users", getAllUsers);
router.put("/users/:userId",updateUser);
router.delete("/users/:userId", removeUser);
export default router;