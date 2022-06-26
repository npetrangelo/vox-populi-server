import express, {Application, Response, Request, Router} from 'express';
import {BallotBox, Consensus, Consent, CountingStrategy, Plurality} from "vox-populi";
import {CountingStrategyUtility, StrategyJson} from "./RestUtility";

export const app: Application = express();
const port: number = 3000;

let boxes: Array<BallotBox> = [];

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    res.json("Vox Populi Server");
});

export interface BoxRequest {
    size: number;
    strategy: StrategyJson;
}

app.route('/boxes')
    .get((req, res) => {
        res.json(boxes);
    })
    .post((req, res) => {
        let boxRequest: BoxRequest = req.body;
        let strategy: CountingStrategy = CountingStrategyUtility.decode(boxRequest.strategy);
        let box = new BallotBox(boxRequest.size, strategy);
        let id = boxes.push(box) - 1;
        res.status(200).json(id);
    }).delete((req, res) => {
        boxes = [];
        res.status(200).json("Boxes deleted");
});

export const server = app.listen(port, () => {
    console.log(`Vox Populi Server!
                 http://localhost:${port}/`);
});
