import bcrypt from "bcrypt";

/***
 * Hash password
 * @param password
 * @returns {Promise<string>}
 */
export async function hashPassword (password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
}