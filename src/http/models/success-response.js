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

    /***
     * Generate a success response with any data
     * @param message {string}
     * @param data {any}
     * @returns {{success: boolean, message}}
     */
    static generateWithData(data) {
        return {
            success: true,
            data
        }
    }
}
