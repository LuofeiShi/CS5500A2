/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to insert a message into the database
     * @param {string} uid1 the primary key of the sender
     * @param {string} uid2 the primary key of the receiver
     * @param {Message} message the message data type
     * @returns Promise To be notified when the message is inserted into the database
     */
    sendMessage = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uid2, from: uid1});

    /**
     * Uses MessageModel to retrieve all messages sent by an user
     * @param {string} uid the primary key of a user
     * @returns Promise To be notified when all messages are retrieved from the database
     */
    findAllSentMessage = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("from")
            .exec();

    /**
     * Uses MessageModel to retrieve all messages received by an user
     * @param {string} uid the primary key of a user
     * @returns Promise To be notified when all messages are retireved from the database
     */
    findAllReceivedMessage = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("to")
            .exec();

    /**
     * Uses MessageModel to remove a message from the database
     * @param {string} mid the primary key of a message
     * @returns Promise To be notified when a message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
};