import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token
 * @param username {string}
 * @param userId {string}
 * @returns {string}
 */
export const generateToken = (username, userId) => {
    return jwt.sign({username, userId}, "my secret key");
}

/***
 * Checks if the token is valid
 * @param token {string}
 * @returns {boolean}
 */
export const isValidToken = (token) => {
    try {
        jwt.verify(token, "my secret key")
        return true
    } catch (e) {
        return false
    }
}

/***
 * Decode the token
 * @param token {string}
 * @returns {jwt.JwtPayload | string | null}
 */
export const decodeToken = (token) => {
    return jwt.decode(token)
}