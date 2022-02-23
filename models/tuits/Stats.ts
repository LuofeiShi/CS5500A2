/**
 * @file Declares Stats data type representing numbers of replies, retuits,
 * and likes of a tuit
 */

/**
 * @typedef Stats Represents numbers of data for a tuit
 * @property {Number} replies the number of replies of a tuit
 * @property {Number} retuits the number of retuits of a tuit
 * @property {Number} likes the number of likes of a tuit
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number
};