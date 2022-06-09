import {BallotBox} from "vox-populi";
import express, {Application, Response, Request, Router} from 'express';

const app: Application = express();
const port: number = 3000;

let boxes: Map<string, BallotBox<string>> = new Map();

app.use(express.json());

app.get('/', async (_req: Request, _res: Response) => {
   _res.send("Vox Populi Server");
});

// app.route('/boxes')
//     .get((req, res) => {
//
//     })
//     .post((req, res) => {
//         // boxes.set();
//     });

app.listen(port, () => {
    console.log(`Vox Populi Server!
                 http://localhost:${port}/`);
});
