import 'jest';

import {BallotBox, Consensus, CountingStrategy, Plurality} from "vox-populi";
import {app, server} from "../src/index";
import request from 'supertest';

afterAll(() => {
    server.close();
});

describe("Testing default endpoint", () => {
    it("receives the expected text", async () => {
        const res = await request(app).get('/');
        expect(res.text).toBe("Vox Populi Server");
        expect(res.statusCode).toBe(200);
    });
});

describe("Testing /boxes endpoint", () => {
    it("has no boxes to start with", async () => {
        const res = await request(app).get('/boxes');
        expect(res.text).toBe("[]");
        expect(res.statusCode).toBe(200);
    });
});
