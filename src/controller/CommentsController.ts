import {Request, Response} from "express";
import {CommentConfirmation, NewCommentRequest} from "../model/Comment";
import {validate, ValidationError} from "class-validator";

export const postComment = async (req: Request, res: Response) => {
    try {
        let newCommentRequest: NewCommentRequest = req.body;
        let validationErrors: Array<ValidationError> = await validate(newCommentRequest);

        if (validationErrors.length > 0) {
            validationErrors.forEach((validationError) => {
                console.log(validationError);
            });
            res.status(400);
            res.send("Invalid request.");
        } else {
            console.log(`Stored comment from ${JSON.stringify(newCommentRequest)}.`);
            let response: CommentConfirmation = {id: 'commentId', timestamp: new Date()};
            res.status(200);
            res.send(response);
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Invalid request.");
    }
}