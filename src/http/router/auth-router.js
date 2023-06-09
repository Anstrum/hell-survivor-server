import Express from "express";
import AuthController from "../controllers/auth-controller.js";
import {
    checkIfUsernameAlreadyExists,
    checkTokenValidity,
    checkUsernameAndPassword
} from "../middleware/auth-middlewares.js";

const authRouter = Express.Router();

authRouter.post("/login", checkUsernameAndPassword, AuthController.login)
authRouter.post("/register", checkUsernameAndPassword, checkIfUsernameAlreadyExists, AuthController.register)
authRouter.get("/me", checkTokenValidity, AuthController.me)

export default authRouter;