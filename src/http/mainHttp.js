import Express from 'express';
import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app';
import firebaseAdminKey from '../../firebase-admin-key.json' assert { type: 'json' }
import authRouter from "./router/auth-router.js";
import userRouter from "./router/user-router.js";

const app = Express();
app.use(Express.json());
app.use("/auth", authRouter)
app.use("/users", userRouter)

app.listen(8080, () => {
    console.log('Listening http server on port 8080');
})