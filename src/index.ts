import express, {Application, Response, Request, Router} from 'express';
import {BallotBox, CountingStrategy, Plurality} from "vox-populi";

const app: Application = express();
const port: number = 3000;

let boxes: Map<string, BallotBox<string>> = new Map();

app.use(express.json());

app.get('/', async (_req: Request, _res: Response) => {
    _res.send("Vox Populi Server");
});

interface BoxRequest {
    id: string;
    size: number;
}

app.route('/boxes')
    .get((req, res) => {

    })
    .post((req, res) => {
        var boxRequest: BoxRequest = req.body;
        let strategy: CountingStrategy<string> = new Plurality();
        let box = new BallotBox<string>(boxRequest.size, strategy)
        boxes.set(boxRequest.id, box);
    });

app.listen(port, () => {
    console.log(`Vox Populi Server!
                 http://localhost:${port}/`);
});
