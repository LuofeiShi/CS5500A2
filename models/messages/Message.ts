/**
 * @file Declares Message data type representing relationship between
 * users and users, as in user message a user
 */
import User from "../users/User";

/**
 * @typedef Message Represent a message between two users
 * @property {string} message the body content of the message
 * @property {User} to the receiver user of the message
 * @property {User} from the user who sent the message
 * @property {Date} sentOn the timestamp of the message
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn?: Date
};