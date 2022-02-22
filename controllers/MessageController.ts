import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.sendMessage);
            app.get("/api/:uid/messages/outs", MessageController.messageController.findAllSentMessage);
            app.get("/api/:uid/messages/ins", MessageController.messageController.findAllReceivedMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.uid1, req.params.uid2, req.body)
            .then((message: Message) => res.json(message));
    findAllSentMessage = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSentMessage(req.params.uid)
            .then(messages => res.json(messages));
    findAllReceivedMessage = (req: Request, res: Response) =>
        MessageController.messageDao.findAllReceivedMessage(req.params.uid)
            .then(messages => res.json(messages));
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
};