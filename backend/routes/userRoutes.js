import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();
const userController = new UserController(); 

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

export default router;
