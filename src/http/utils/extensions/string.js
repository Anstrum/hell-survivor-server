/***
 * checks if the string is a valid username
 * @param value {string}
 * @returns {boolean}
 */
export const isValidUsername = (value) => {
    return value != null && value.length >= 3 && !value.includes(" ")
}

/***
 * Checks if the string is a valid password
 * @param value {string}
 * @returns {boolean}
 */
export const isValidPassword = (value) => {
    return value != null && value.length >= 6 && !value.includes(" ")
}
