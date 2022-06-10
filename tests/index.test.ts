import 'jest';

import {BallotBox, Plurality} from "vox-populi";
import {Foo} from "../src/foo";

describe("Testing if Jest breaks the laws of physics", () => {
   it("just works, magically", () => {
       let box = new BallotBox<string>(5, new Plurality());
       let foo = new Foo();
       foo.foo();
       expect(true).toBe(true);
   });
});
