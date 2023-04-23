import Firebase from "./firebase.js";

/***
 * Check if username already exists
 * @param username
 * @returns {Promise<boolean>}
 */
export async function usernameAlreadyExists(username) {
    const firebase = new Firebase()
    const usersRef = firebase.db.collection('users');

    return await new Promise((resolve, reject) => {
        usersRef
            .where('username', '==', username)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    resolve(true)
                }
                resolve(false)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
