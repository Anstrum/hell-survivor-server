export default class AuthResponse {
    /**
     *
     * @param token {string}
     * @param username {string}
     * @returns {{token: string, username: string}}
     */
    static generate(token, username) {
        return {
            token,
            username
        }
    }
}