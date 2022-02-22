import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;
    userUnfollowsUser (uid1: string, uid2: string): Promise<any>;
    findAllFollowingUsers (uid: string): Promise<Follow[]>;
    findAllFollowers (uid: string): Promise<Follow[]>;
};