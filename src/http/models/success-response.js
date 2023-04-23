export default class SuccessResponse {
    /**
     *
     * @param message {string}
     * @returns {{success: boolean, message: string}}
     */
    static generate(message) {
        return {
            success: true,
            message
        }
    }
}