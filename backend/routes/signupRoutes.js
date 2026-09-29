import express from "express";
import { SignupUser } from "../controllers/signupControllers.js";
import {loginUser} from "../controllers/loginControllers.js";
const router = express.Router();

router.post("/signup", SignupUser);
router.post("/login",loginUser)

export default router;