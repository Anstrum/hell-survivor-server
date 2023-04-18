import ErrorResponse from "../models/error-response.js";
import {isValidPassword, isValidUsername} from "../utils/extensions/string.js";
import Firebase from "../utils/firebase.js";
import {isValidToken} from "../utils/jwt.js";

export const checkUsernameAndPassword = (req, res, next) => {
    const { username, password } = req.body;

    if (!isValidUsername(username)) {
        res.status(400).send(ErrorResponse.generate("Invalid username", 400));
        return
    }

    if (!isValidPassword(password)) {
        res.status(400).send(ErrorResponse.generate("Invalid password", 400));
        return;
    }
    next();
}

export const usernameAlreadyExists = (req, res, next) => {
    const { username } = req.body;
    const firebase = new Firebase()
    const usersRef = firebase.db.collection('users');

    usersRef
        .where('username', '==', username)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                res.status(400).send(ErrorResponse.generate("Username already exists", 400));
                return;
            }
            next();
        })
        .catch((error) => {
            res.status(500).send(ErrorResponse.generate(error.message, 500));
        })
}

export const checkTokenValidity = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]

    if (!isValidToken(token)) {
        res.status(401).send(ErrorResponse.generate("Invalid token", 401));
        return
    }

    next()
}