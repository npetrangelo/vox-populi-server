import {BallotBox} from "vox-populi";
import express from 'express';

const app: express.Application = express();
const port: number = 3000;

let boxes: Map<string, BallotBox<string>> = new Map();

app.get('/', (_req, _res) => {
   _res.send("Typescript With Express");
});

// app.route('/boxes')
//     .get((req, res) => {
//
//     })
//     .post((req, res) => {
//         // boxes.set();
//     });

app.listen(port, () => {
    console.log(`Typescript with Express
                 http://localhost:${port}/`);
});
