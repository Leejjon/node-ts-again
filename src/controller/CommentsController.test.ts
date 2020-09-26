import 'mocha';
import {expect} from 'chai';
import {server} from "../index";
import {agent as request} from 'supertest';

describe("Test the API calls", () => {
    after((done) => {
        server.close(done);
    });

    it('Test the happy flow', async () => {
        const res = await request(server)
            .post('/comments').send({
                message: "This is a post.,",
                nickname: "Leejjon"
            });
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal("commentId");
    });

    it('Send invalid json', async () => {
        const res = await request(server)
            .post('/comments').type('json').send('{"invalid"}');
        expect(res.status).to.equal(400);
    });
});