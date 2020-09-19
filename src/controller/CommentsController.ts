import {Request, Response} from "express";
import {CommentConfirmation, NewCommentRequest, NewCommentRequestClass} from "../model/Comment";
import {validate} from "class-validator";
import {plainToClass} from "class-transformer";
import {ValidationError} from "class-validator/types/validation/ValidationError";

export const postComment = async (req: Request, res: Response) => {
    try {
        let validationErrors: Array<ValidationError> = await validate(plainToClass(NewCommentRequestClass, req.body));

        console.log(JSON.stringify(req.body));
        validationErrors.forEach((validationError) => {
            console.log(validationError);
        });
        console.log(validationErrors.length);

        const newCommentRequest: NewCommentRequest = req.body;

        if (newCommentRequest.message && newCommentRequest.nickname) {
            console.log(`Stored comment from ${newCommentRequest.nickname}.`);
            let response: CommentConfirmation = {id: 'commentId', timestamp: new Date()};
            res.status(200);
            res.send(response);
        } else {
            res.status(400);
            res.send("Invalid request.");
        }
    } catch (error) {
        res.status(400);
        res.send("Invalid request.");
    }
}