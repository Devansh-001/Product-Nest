import express from "express"
import { handleUserSignUp, handleUserSignIn } from "../controllers/users.controller.js";

const router = express.Router();

router.post(`/signUp`, handleUserSignUp);
router.post('/signIn', handleUserSignIn);

export default router;