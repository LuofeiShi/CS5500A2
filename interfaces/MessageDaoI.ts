import Message from "../models/messages/Message";

export default interface MessageDaoI {
    sendMessage (uid1: string, uid2: string, message: Message): Promise<Message>;
    findAllSentMessage (uid: string): Promise<Message[]>;
    findAllReceivedMessage (uid: string): Promise<Message[]>;
    deleteMessage (mid: string): Promise<any>;
};