import 'jest';
import {CountingStrategyUtility, StrategyJson} from "../src/RestUtility";
import {Average, Consensus, Consent, Plurality, Quorum} from "vox-populi";

describe("Testing CountingStrategyUtility", () => {
    it("encodes Consensus", () => {
        let consensus = new Consensus(0.5);
        let json: StrategyJson = {type: "Consensus", threshold: 0.5};
        expect(CountingStrategyUtility.encode(consensus)).toEqual(json);
    });

    it("decodes Consensus", () => {
        let json: StrategyJson = {type: "Consensus", threshold: 0.5};
        let consensus = new Consensus(0.5);
        expect(CountingStrategyUtility.decode(json)).toEqual(consensus);
    });

    it("encodes Consent", () => {
        let consent = new Consent(0.5);
        let json: StrategyJson = {type: "Consent", threshold: 0.5};
        expect(CountingStrategyUtility.encode(consent)).toEqual(json);
    });

    it("decodes Consent", () => {
        let json: StrategyJson = {type: "Consent", threshold: 0.5};
        let consent = new Consent(0.5);
        expect(CountingStrategyUtility.decode(json)).toEqual(consent);
    });

    it("encodes Plurality with threshold", () => {
        let plurality = new Plurality(0.5);
        let json: StrategyJson = {type: "Plurality", threshold: 0.5};
        expect(CountingStrategyUtility.encode(plurality)).toEqual(json);
    });

    it("decodes Plurality with threshold", () => {
        let json: StrategyJson = {type: "Plurality", threshold: 0.5};
        let plurality = new Plurality(0.5);
        expect(CountingStrategyUtility.decode(json)).toEqual(plurality);
    });

    it("encodes Plurality without threshold", () => {
        let plurality = new Plurality();
        let json: StrategyJson = {type: "Plurality"};
        expect(CountingStrategyUtility.encode(plurality)).toEqual(json);
    });

    it("decodes Plurality without threshold", () => {
        let json: StrategyJson = {type: "Plurality"};
        let plurality = new Plurality();
        expect(CountingStrategyUtility.decode(json)).toEqual(plurality);
    });

    it("encodes Quorum", () => {
        let quorum = new Quorum(0.5, new Plurality());
        let json: StrategyJson = {type: "Quorum", threshold: 0.5, ifEnough: {type: "Plurality"}};
        expect(CountingStrategyUtility.encode(quorum)).toEqual(json);
    });

    it("decodes Quorum", () => {
        let json: StrategyJson = {type: "Quorum", threshold: 0.5, ifEnough: {type: "Plurality"}};
        let quorum = new Quorum(0.5, new Plurality());
        expect(CountingStrategyUtility.decode(json)).toEqual(quorum);
    });

    it("encodes Average", () => {
        let average = new Average();
        let json: StrategyJson = {type: "Average"};
        expect(CountingStrategyUtility.encode(average)).toEqual(json);
    });

    it("decodes Average", () => {
        let json: StrategyJson = {type: "Average"};
        let average = new Average();
        expect(CountingStrategyUtility.decode(json)).toEqual(average);
    });
});
