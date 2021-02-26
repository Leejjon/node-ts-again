import 'mocha';
import {expect} from 'chai';
import {server} from "../index";
import {agent as request} from 'supertest';
import {NewCommentRequest} from "../model/Comment";

describe("Test the API calls", () => {
    after((done) => {
        server.close(done);
    });

    it('Test the happy flow', async () => {
        let commentRequest: NewCommentRequest = {
            message: "This is a post.,",
            nickname: "Leejjon"
        };

        const res = await request(server)
            .post('/comments').send(commentRequest);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal("commentId");
    });

    it('Send invalid json syntax', async () => {
        const res = await request(server)
            .post('/comments').type('json').send('{"invalid"}');
        expect(res.status).to.equal(400);
    });

    it('Send valid json with missing nickname field', async () => {
        const res = await request(server)
            .post('/comments').send({
                message: "This is a post.,"
            });
        expect(res.status).to.equal(400);
    });
});
