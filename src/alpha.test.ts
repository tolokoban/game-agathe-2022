import { makeBounceAlpha } from "./alpha"

describe("alpha.ts", () => {
    describe("makeBounceAlpha", () => {
        const alpha = makeBounceAlpha(1,2)
        it("should be a nice inverted parabol", () => {
            expect(alpha(0)).toEqual(0)
            expect(alpha(1)).toEqual(1)
            expect(alpha(2)).toEqual(0)
        })
    })
})
