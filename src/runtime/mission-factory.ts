import { rand } from "../tools"
import { MouseMission } from "./../types"

const COLS: number[] = parse("12345")

export default class MissionFactory {
    private prevMissionTime = 0
    private index = 0

    constructor(private readonly time0: number) {
        this.prevMissionTime = time0 + 2000
    }

    readonly getNextMission = (time: number): MouseMission => {
        this.prevMissionTime += 500
        const column = COLS[this.index]
        this.index = (this.index + 1) % COLS.length
        return {
            column: column,
            speed: rand(1, 3) * 0.0005,
            time: this.prevMissionTime - time,
        }
    }
}

function parse(code: string): number[] {
    const base = "1".charCodeAt(0)
    return code.split("").map((letter) => (letter.charCodeAt(0) - base) % 5)
}
