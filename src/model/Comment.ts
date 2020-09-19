import {IsString} from "class-validator";

export interface NewCommentRequest {
    message: string,
    nickname: string
}

export class NewCommentRequestClass {
    @IsString()
    public message: string;
    @IsString()
    public nickname: string;

    constructor(message: string, nickname: string) {
        this.message = message;
        this.nickname = nickname;
    }
}


export interface CommentConfirmation {
    id: string,
    timestamp: Date
}