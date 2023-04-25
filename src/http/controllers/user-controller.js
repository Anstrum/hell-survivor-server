import Express from "express";
import Firebase from "../utils/firebase.js";
import {decodeToken} from "../utils/jwt.js";
import bcrypt from "bcrypt";
import ErrorResponse from "../models/error-response.js";
import SuccessResponse from "../models/success-response.js";
import {hashPassword} from "../utils/bcrypt.js";
import {usernameAlreadyExists} from "../utils/utils.js";
import {userToDto} from "../utils/user-mapper.js";

export default class UserController {
    /**
     * get user scores
     * @param req {Express.Request}
     * @param res {Express.Response}
     */
    static ranks(req, res) {
        const firebase = new Firebase()
        const usersRef = firebase.db.collection('users');

        usersRef.orderBy("rank", "desc").get().then((querySnapshot) => {
            let users = []

            querySnapshot.forEach((doc) => {
                users.push(userToDto(doc.data(), doc.id))
            })

            res.status(200).send(SuccessResponse.generateWithData(users))
        }).catch(error => {
            res.status(500).send(ErrorResponse.generate(error.message, 500))
            console.log(error)
        })
    }

    /**
     * update user infos
     * @param req {Express.Request}
     * @param res {Express.Response}
     */
    static async updateUser(req, res) {
        const {username, password, newPassword} = req.body;
        const firebase = new Firebase()
        const usersRef = firebase.db.collection('users');
        const userId = decodeToken(req.headers.authorization.split(' ')[1]).userId
        let isUpdated = false

        try {
            if (username !== undefined && username !== null && await usernameAlreadyExists(username)) {
                res.status(400).send(ErrorResponse.generate("Username already exists", 400))
                return
            }
        } catch (error) {
            res.status(500).send(ErrorResponse.generate(error.message, 500))
            return
        }

        usersRef.doc(userId).get().then(async (doc) => {
            let user = doc.data()

            if (username !== null && username !== undefined && user.username !== username) {
                user.username = username
                isUpdated = true
            }

            if (password != null && newPassword != null) {
                let isSame = false

                try {
                    isSame = await bcrypt.compare(password, user.password)
                } catch (error) {
                    res.status(500).send(ErrorResponse.generate(error.message, 500))
                    return
                }

                if (isSame === true) {
                    try {
                        user.password = await hashPassword(newPassword)
                    } catch (error) {
                        res.status(500).send(ErrorResponse.generate(error.message, 500))
                        return
                    }
                }
            }

            if (isUpdated) {
                usersRef.doc(userId).set(user).then(() => {
                    res.status(200).send(SuccessResponse.generate("User updated"))
                }).catch(error => {
                    res.status(500).send(ErrorResponse.generate(error.message, 500))
                    console.log(error)
                })
            } else {
                res.status(400).send(ErrorResponse.generate("Nothing to update", 400))
            }
        })
    }
}