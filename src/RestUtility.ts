import {Average, Consensus, Consent, CountingStrategy, Plurality, Quorum} from "vox-populi";

interface RestUtility<NativeType, JsonType> {
    encode(obj: NativeType): JsonType;
    decode(json: JsonType): NativeType;
}

type StrategyType = "Consensus"|"Consent"|"Plurality"|"Quorum"|"Average";
export type StrategyJson = {type: StrategyType, threshold?: number, ifEnough?: StrategyJson};

export let CountingStrategyUtility: RestUtility<CountingStrategy, StrategyJson> = {
    encode(obj: CountingStrategy): StrategyJson {
        let json: StrategyJson = {type: "Plurality", threshold: obj.threshold};
        switch (Object.getPrototypeOf(obj)) {
            case Consensus.prototype:
                json.type = "Consensus";
                break;
            case Consent.prototype:
                json.type = "Consent";
                break;
            case Plurality.prototype:
                json.type = "Plurality";
                break;
            case Quorum.prototype:
                json.type = "Quorum";
                break;
            case Average.prototype:
                json.type = "Average";
                break;
        }
        if (obj.ifEnough) {
            json.ifEnough = this.encode(obj.ifEnough);
        }
        return json;
    },
    decode(json: StrategyJson): CountingStrategy {
        switch (json.type) {
            case "Consensus":
                return new Consensus((json as {threshold: number}).threshold);
            case "Consent":
                return new Consent((json as {threshold: number}).threshold);
            case "Plurality":
                return new Plurality(json.threshold);
            case "Average":
                return new Average();
            case "Quorum":
                let quorum = json as {threshold: number, ifEnough: StrategyJson}
                return new Quorum(quorum.threshold, this.decode(quorum.ifEnough));
        }
    },
};
