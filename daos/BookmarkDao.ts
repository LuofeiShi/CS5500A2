import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}
    userBookmarksTuit = async (tid: string, uid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
    userUnbookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
}