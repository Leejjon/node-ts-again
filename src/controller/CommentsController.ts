import {Request, Response} from "express";
import {CommentConfirmation, NewCommentRequest} from "../model/Comment";

export const postComment = async (req: Request, res: Response) => {
    try {
        const newCommentRequest: NewCommentRequest = req.body;
        console.log(`Stored comment from ${newCommentRequest.nickname}.`);
        let response: CommentConfirmation = {id: 'commentId', timestamp: new Date()};
        res.status(200);
        res.send(response);
    } catch (error) {
        res.status(400);
        res.send("Invalid request.");
    }
}