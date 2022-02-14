import { DECREASE_DELTAT_TIME, START_DELTA_TIME } from "../constants"
import { rand } from "../tools"
import { Context, MouseMission } from "./../types"

const MISSIONS: MouseMissionWithoutTime[] = parse(`
33454321233351
`)

export default class MissionFactory {
    private prevMissionTime = 0
    private index = 0
    private deltaTime = START_DELTA_TIME

    constructor(private readonly context: Context) {
        this.prevMissionTime = context.time + 2000
    }

    readonly getNextMission = (time: number): MouseMission => {
        this.prevMissionTime += this.deltaTime
        this.deltaTime = Math.max(200, this.deltaTime - DECREASE_DELTAT_TIME)
        const mission = MISSIONS[this.index]
        this.index = (this.index + 1) % MISSIONS.length
        return {
            ...mission,
            time: this.prevMissionTime - time,
        }
    }
}

interface MouseMissionWithoutTime {
    column: number
    speed: number
    bonus: boolean
}

function parse(code: string): MouseMissionWithoutTime[] {
    const missions: MouseMissionWithoutTime[] = []
    const base = "1".charCodeAt(0)
    let bonus = false
    for (const letter of code.split("")) {
        if (letter <= " ") continue

        if (letter === "+") {
            bonus = true
        } else {
            missions.push({
                bonus,
                column: (letter.charCodeAt(0) - base) % 5,
                speed: rand(1, 3) * 0.0005,
            })
            bonus = false
        }
    }
    console.log('🚀 [mission-factory] missions = ', missions) // @FIXME: Remove this line written on 2022-02-14 at 16:47
    return missions
}
