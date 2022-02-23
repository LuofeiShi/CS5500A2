/**
 * @file Implements mongoose Schema for Like
 * documents in the likes collection
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents the like of a tuit
 * @property {ObjectId} tuit the Id of a tuit liked by a user
 * @property {ObjectId} likedBy the Id of a user liking the tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;