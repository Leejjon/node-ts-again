import {Request, Response} from "express";
import {CommentConfirmation, NewCommentRequest} from "../model/Comment";
import {plainToClass} from "class-transformer";

export const postComment = async (req: Request, res: Response) => {
    try {
        let newCommentRequest: NewCommentRequest = plainToClass(NewCommentRequest, req.body as Object);
        console.log(`Stored comment from ${JSON.stringify(newCommentRequest)}.`);
        let response: CommentConfirmation = {id: 'commentId', timestamp: new Date()};
        res.status(200);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send("Invalid request.");
    }
}