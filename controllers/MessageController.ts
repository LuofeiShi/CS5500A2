/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to create a message instance</li>
 *     <li>GET /api/users/:uid/messages/outs to retrieve all messages instances sent by an user</li>
 *     <li>GET /api/users/:uid/messages/ins to retrieve all messages instances received by user</li>
 *     <li>DELETE /api/messages/:mid to remove a message instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web servic API
     * @returns FollowController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            // Restful. Message Web service API
            app.post("/api/users/:uid1/messages/:uid2",
                MessageController.messageController.sendMessage);
            app.get("/api/users/:uid/messages/outs",
                MessageController.messageController.findAllSentMessage);
            app.get("/api/users/:uid/messages/ins",
                MessageController.messageController.findAllReceivedMessage);
            app.delete("/api/messages/:mid",
                MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Creates a new message instance
     * @param {Request} req Represent request from client, including body
     * containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.uid1, req.params.uid2, req.body)
            .then((message: Message) => res.json(message));

    /**
     * Retrieves the messages sent by an user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the messages that match the user id
     * in the database
     */
    findAllSentMessage = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSentMessage(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves the messages received by an user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the messages that match the user id
     * in the database
     */
    findAllReceivedMessage = (req: Request, res: Response) =>
        MessageController.messageDao.findAllReceivedMessage(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Removes a message instance from the database
     * @param {Request} req Represent the request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
};