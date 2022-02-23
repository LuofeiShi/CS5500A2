/**
 * @file Implements mongoose schema for message
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents a message send from a user to another user
 * @property {string} message a string represents the content of message body
 * @property {ObjectId} to the Id of a user received the message
 * @property {ObjectId} from the Id of a user sent the message
 * @property {Date} sentOn the timestamp of the message
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: "string", required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;