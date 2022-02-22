import {Request, Response} from "express";

export default interface MessageControllerI {
    sendMessage (req: Request, res: Response): void;
    findAllSentMessage (req: Request, res: Response): void;
    findAllReceivedMessage (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
};