import ErrorResponse from "../models/error-response.js";
import {isValidPassword, isValidUsername} from "../utils/extensions/string.js";
import Firebase from "../utils/firebase.js";
import {isValidToken} from "../utils/jwt.js";
import {usernameAlreadyExists} from "../utils/utils.js";

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

export const checkIfUsernameAlreadyExists = async (req, res, next) => {
    let { username } = req.body;

    if (await usernameAlreadyExists(username)) {
        res.status(400).send(ErrorResponse.generate("Username already exists", 400));
        return
    }

    next()
}

export const checkTokenValidity = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]

    if (!isValidToken(token)) {
        res.status(401).send(ErrorResponse.generate("Invalid token", 401));
        return
    }

    next()
}