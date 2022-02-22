import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    sendMessage = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uid2, from: uid1});
    findAllSentMessage = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("from")
            .exec();
    findAllReceivedMessage = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("to")
            .exec();
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}