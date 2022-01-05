import { AnySchema } from "yup";
import { Request, Response, NextFunction } from  "express";
import log from "../logger";
import { ErrorWithMessage } from "../interface/error.interface";

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        log.info(req);

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (e) {
        const error = e as ErrorWithMessage;
        log.error(error);
        return res.status(400).send(error.errors);
    }
};

export default validate;