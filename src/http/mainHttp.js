import Express from 'express';
import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app';
import firebaseAdminKey from '../../firebase-admin-key.json' assert { type: 'json' }
import authRouter from "./router/auth-router.js";

const app = Express();
app.use(Express.json());
app.use("/auth", authRouter)

app.listen(8080, () => {
    console.log('Listening http server on port 8080');
})