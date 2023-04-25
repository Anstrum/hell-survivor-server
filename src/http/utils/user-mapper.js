/***
 * Maps a user to a DTO
 * @param user {Object}
 * @param userId {string}
 * @returns {{id: string, username: string}}
 */
export function userToDto(user, userId) {
    return {
        id: userId,
        username: user.username,
        rank: user.rank
    }
}