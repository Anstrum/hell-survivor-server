import Express from "express";
import UserController from "../controllers/user-controller.js";
import {checkTokenValidity} from "../middleware/auth-middlewares.js";

const userRouter = Express.Router()

userRouter.put("/update", checkTokenValidity, UserController.updateUser)
userRouter.get("/ranks", checkTokenValidity, UserController.ranks)

export default userRouter