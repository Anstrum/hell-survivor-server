export default class ErrorResponse {

    /**
     *
     * @param message {string}
     * @param code {number}
     * @returns {{code: number, message: string}}
     */
    static generate(message, code) {
        return {
            message,
            code
        }
    }
}