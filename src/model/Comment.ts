export interface NewCommentRequest {
    message: string,
    nickname: string
}

export interface CommentConfirmation {
    id: string,
    timestamp: Date
}