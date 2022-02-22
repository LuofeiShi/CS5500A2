import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid1, userFollowing: uid2});
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid1, userFollowing: uid2});
    findAllFollowingUsers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({user:uid})
            .populate("userFollowing")
            .exec();
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({user: uid})
            .populate("userFollowed")
            .exec();
}