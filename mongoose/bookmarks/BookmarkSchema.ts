/**
 * @file Implements mongoose schema for bookmark
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents bookmark of a tuit created by a user
 * @property {ObjectId} bookmarkedTuit the Id of bookmarked tuit
 * @property {ObjectId} bookmarkedBy the id of user who bookmarked a tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;