/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmark a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents the bookmark set by user to bookmark tuits
 * @property {Tuit} bookmarkedTuit the tuit that a user bookmarked
 * @property {User} bookmarkedBy the user that bookmarked a tuit
 */
export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};