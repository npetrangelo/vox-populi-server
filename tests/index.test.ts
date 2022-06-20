import 'jest';

import {BallotBox, Consensus, CountingStrategy, Plurality} from "vox-populi";
import {app, BoxRequest, server} from "../src/index";
import request from 'supertest';

afterAll(() => {
    server.close();
});

describe("Testing default endpoint", () => {
    it("receives the expected text", async () => {
        await request(app).get('/').then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toBe("Vox Populi Server");
        });
    });
});

let body: BoxRequest = {size: 7, strategyObject: {}, strategyType: "Plurality"};

describe("Testing /boxes endpoint", () => {
    beforeEach(async () => {
        await request(app).delete('/boxes');
        await request(app).post('/boxes').send(body);
    });

    it("GET method", async () => {
        await request(app).get('/boxes').then(res => {
            expect(res.body.length).toBe(1);
            expect(res.statusCode).toBe(200);
        });
    });

    it("POST method", async () => {
        await request(app).post('/boxes').send(body).then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toBe(1);
        });

        await request(app).get('/boxes').then(res => {
            expect(res.statusCode).toBe(200);
            console.log(res.body);
        });
    });

    it("DELETE method", async () => {
        await request(app).delete('/boxes');
        await request(app).get('/boxes').then(res => {
            expect(res.body.length).toBe(0);
            expect(res.statusCode).toBe(200);
        });
    });
});
