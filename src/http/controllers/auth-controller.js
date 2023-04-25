import Express from "express";
import AuthResponse from "../models/auth-response.js";
import {decodeToken, generateToken} from "../utils/jwt.js";
import ErrorResponse from "../models/error-response.js";
import bcrypt from "bcrypt";
import Firebase from "../utils/firebase.js";

export default class AuthController {
    /***
     * Register a new user
     * @param req {Express.Request}
     * @param res {Express.Response}
     */
    static register(req, res) {
        const {username, password} = req.body;
        const firebase = new Firebase()
        const usersRef = firebase.db.collection('users');

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).send(ErrorResponse.generate(err.message, 500));
                return;
            }

            usersRef.add({
                username,
                password: hash,
                rank: 0
            }).then(doc => {
                res.send(AuthResponse.generate(generateToken(username, doc.id), username));
            }).catch((error) => {
                res.status(500).send(ErrorResponse.generate(error.message, 500));
            })
        })
    }

    /***
     * Login a user
     * @param req {Express.Request}
     * @param res {Express.Response}
     */
    static login(req, res) {
        const {username, password} = req.body;
        const firebase = new Firebase()
        const usersRef = firebase.db.collection('users');

        usersRef
            .where('username', '==', username)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.status(403).send(ErrorResponse.generate("Invalid credentials", 403));
                    return;
                }

                const doc = snapshot.docs[0]
                console.log(JSON.stringify(doc.data()))
                bcrypt.compare(password, doc.data().password, (error, isSame) => {
                    if (error) {
                        res.status(500).send(ErrorResponse.generate(error.message, 500))
                        return
                    }

                    if (isSame) {
                        res.send(AuthResponse.generate(generateToken(username, doc.id), username))
                        return
                    }
                    res.status(403).send(ErrorResponse.generate("Invalid credentials", 403))
                })
            })
    }

    /***
     * Get the current user
     * @param req {Express.Request}
     * @param res {Express.Response}
     */
    static me(req, res) {
        const token = req.header('Authorization').split(' ')[1]
        const firebase = new Firebase()
        const usersRef = firebase.db.collection('users')
        const tokenDecoded = decodeToken(token)
        const userId = tokenDecoded.userId
        const username = tokenDecoded.username

        usersRef.doc(userId).get().then(doc => {
            if (!doc.exists) {
                res.status(404).send(ErrorResponse.generate("User not found", 404))
                return
            }

            res.send(AuthResponse.generate(token, username))
        }).catch(error => {
            res.status(500).send(ErrorResponse.generate(error.message, 500))
        })
    }
}
