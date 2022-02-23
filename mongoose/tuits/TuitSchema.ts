/**
 * @file Implements mongoose model to CRUD
 * documents in the tuit collection
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents a tuit posted by a user
 * @property {String} tuit the body content of a tuit
 * @property {ObjectId} postedBy the id of user who posted the tuit
 * @property {Date} postedOn the timestamp of the tuit
 * @property {String} image an optional image inside a tuit body
 * @property {String} youtube an optional youtube video inside a tuit body
 * @property {String} avatarLogo an optional avatar logo inside a tuit body
 * @property {String} imageOverlay an optional overlay image inside a tuit body
 * @property {Number} replies the number of replies of a tuit
 * @property {Number} retuits the number of retuits of a tuit
 * @property {Number} likes the number of likes of a tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: "tuits"});
export default TuitSchema;