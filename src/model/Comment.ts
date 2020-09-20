import {IsAlphanumeric, IsString, Length, Matches} from "class-validator";

export class NewCommentRequest {

    @IsString()
    @Matches(/^([a-zA-Z0-9_ .,:;-]){10,200}$/)
    public message: string;

    @IsString()
    @Length(3, 20)
    @IsAlphanumeric()
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