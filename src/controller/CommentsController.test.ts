import 'mocha';
import {expect} from 'chai';
import {server} from "../index";
import {agent as request} from 'supertest';

describe("Test the API calls", () => {
    let theServer;

    after((done) => {
        server.close(done);
    });

    it('Test the happy flow', async () => {
        theServer = server;
        const res = await request(theServer)
            .post('/comments').send({
                message: "This is a post.,",
                nickname: "Leejjon"
            });
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal("commentId");
    });

    it('Send invalid json', async () => {
        theServer = server;
        const res = await request(theServer)
            .post('/comments').type('json').send('{"invalid"}');
        expect(res.status).to.equal(400);
    });
});