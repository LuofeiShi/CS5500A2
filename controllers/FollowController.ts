/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the following user instances of an user</li>
 *     <li>GET /api/users/:uid/follows/users to retrieve all the followers instances of an user</li>
 *     <li>POST /api/users/:uid1/follows/:uid2 to create a follow instance</li>
 *     <li>DELETE /api/users/:uid1/follows/:uid2 to remove a follow instance</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing bookmark CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web servic API
     * @returns FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();

            // Restful. Follow Web service API
            app.get("/api/users/:uid/follows",
                FollowController.followController.findAllFollowingUsers);
            app.get("/api/users/:uid/follows/users",
                FollowController.followController.findAllFollowers);
            app.post("/api/users/:uid1/follows/:uid2",
                FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/follows/:uid2",
                FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Creates a new follow instance
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the follow object
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * Deletes a follow instance from database
     * @param {Request} req Represents request from clients
     * @param {Response} res Represents response to client, including status
     * on whether a follow was removed successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves all users from the database followed by an user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowingUsers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingUsers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users from the database following an user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));
};