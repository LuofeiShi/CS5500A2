/**
 * @file Declares Tuit data type representing a Tuit in Tuiter
 */
import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents a tuit posted by a user
 * @property {string} tuit the body content of a tuit
 * @property {User} postedBy the user who posted the tuit
 * @property {Date} postedOn the timestamp of the tuit
 * @property {String} image an optional image inside a tuit body
 * @property {String} youtube an optional youtube video inside a tuit body
 * @property {String} avatarLogo an optional avatar logo inside a tuit body
 * @property {String} imageOverlay an optional overlay image inside a tuit body
 * @property {Stats} stats the stats of the tuit such as retuits number and likes number
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};