import express, {Application, Response, Request, Router} from 'express';
import {BallotBox, Consensus, Consent, CountingStrategy, Plurality} from "vox-populi";

export const app: Application = express();
const port: number = 3000;

let boxes: Array<BallotBox> = [];

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    res.json("Vox Populi Server");
});

export interface BoxRequest {
    size: number;
    strategyType: "Consensus"|"Consent"|"Plurality"|"Quorum"|"Average";
    strategyObject: any;
}

app.route('/boxes')
    .get((req, res) => {
        res.json(boxes);
    })
    .post((req, res) => {
        let boxRequest: BoxRequest = req.body;
        let strategy: CountingStrategy;
        switch (boxRequest.strategyType) {
            case "Consensus":
                if (Consensus.check(boxRequest.strategyObject)) {
                    strategy = boxRequest.strategyObject;
                } else {
                    res.status(400).send("Invalid strategyObject");
                    return;
                }
                break;
            case "Consent":
                if (Consent.check(boxRequest.strategyObject)) {
                    strategy = boxRequest.strategyObject;
                } else {
                    res.status(400).send("Invalid strategyObject");
                    return;
                }
                break;
            default:
            case "Plurality":
                strategy = boxRequest.strategyObject as Plurality;
                break;
        }
        let box = new BallotBox(boxRequest.size, strategy);
        let id = boxes.push(box) - 1;
        res.json(id);
    }).delete((req, res) => {
        boxes = [];
        res.status(200).json("Boxes deleted");
});

export const server = app.listen(port, () => {
    console.log(`Vox Populi Server!
                 http://localhost:${port}/`);
});
