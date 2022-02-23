/**
 * @file Implements mongoose schema for follow
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents a user follow another user's activities
 * @property {ObjectId} userFollowed the Id of a user following another user
 * @property {ObjectId} userFollowing the Id of a user followed by another user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;