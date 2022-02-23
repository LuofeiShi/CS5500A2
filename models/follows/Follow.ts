/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in user follow a user
 */
import User from "../users/User"

/**
 * @typedef Follow Represents one user followed another user
 * @property {User} userFollowed the user following another user
 * @property {User} userFollowing the user followed by another user
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
};