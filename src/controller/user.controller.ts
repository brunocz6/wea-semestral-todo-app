import { Request, Response } from "express";
import { get, omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";
import { ErrorWithMessage } from "../interface/error.interface";
import { findSessions } from "../service/session.service";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e) {
        const error = e as ErrorWithMessage;
        log.error(error);
        return res.status(409).send(error.message);
    }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}