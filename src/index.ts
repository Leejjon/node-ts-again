import express, {Request, Response, NextFunction} from "express";
import {postComment} from "./controller/RequestController";

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

    if (err instanceof SyntaxError && (err as SyntaxErrorWithStatusAndBody).status === 400 && 'body' in err) {
        const inputBody = (err as SyntaxErrorWithStatusAndBody).body;
        console.error(`Somebody tried to do a request with invalid json: ${inputBody}`);
        return res.sendStatus(400); // Bad request
    }

    // If it's another error, let the default handler handle it.
    next();
});

app.post("/comments", postComment);

const server = app.listen(PORT, () => {
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