/**
 * @file Implements DAO managing data storage of Follow. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follow
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to create a Follow into the database
     * @param {string} uid1 the primary key of the User who follow another User
     * @param {string} uid2 the primary key of the User who was followed by another User
     * @returns Promise To be notified when a Follow is created in the database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid1, userFollowing: uid2});

    /**
     * Uses FollowModel to remove a Follow from the database
     * @param {string} uid1 the primary key of the User who follow another User
     * @param {string} uid2 the primary key of the User who was followed by another User
     * @returns Promise To be notified when a Follow is removed from the database
     */
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid1, userFollowing: uid2});

    /**
     * Uses FollowModel to retrieve an user's following users
     * @param {string} uid the primary key of User
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllFollowingUsers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve an user's followers
     * @param {string} uid the primary key of User
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
};