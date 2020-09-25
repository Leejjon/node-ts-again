import express, {Request, Response, NextFunction, RequestHandler} from "express";
import {postComment} from "./controller/CommentsController";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {NewCommentRequest} from "./model/Comment";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

interface SyntaxErrorWithStatusAndBody extends SyntaxError {
    status: number;
    body: string;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    if ((err as SyntaxErrorWithStatusAndBody).status === 400 && 'body' in err) {
        const bodyWithInvalidJson = (err as SyntaxErrorWithStatusAndBody).body;
        console.error(`Somebody tried to do a request with invalid json: ${bodyWithInvalidJson}`);
        return res.sendStatus(400); // Bad request
    }
    // If it's another error, let the default handler handle it.
    next();
});

function validationMiddleware<T>(type: any): RequestHandler {
    return async (req, res, next) => {
        let validationErrors = await validate(plainToClass(type, req.body));

        if (validationErrors.length > 0) {
            validationErrors.forEach((validationError) => {
                console.log(validationError);
            });
            res.status(400);
            res.send("Invalid request.");
        } else {
            next();
        }
    };
}

app.post("/comments", validationMiddleware(NewCommentRequest), postComment);

export const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}