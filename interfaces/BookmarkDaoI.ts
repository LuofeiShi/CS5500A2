import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
};