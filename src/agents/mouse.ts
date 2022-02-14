import { COLUMNS } from "../constants"
import { Sprite } from "../painters/sprite"
import { rand } from "../tools"
import { Context, MouseMission } from "../types"

enum MouseState {
    dead = 0,
    alive = 1,
    escaping = 2,
    escaped = 3,
}

export default class Mouse implements Sprite {
    col: number = 1
    row: number = 1
    x: number = 0
    y: number = 0
    size: number = 1 / COLUMNS
    private column = 0
    private speed = rand(1, 3)
    private state: MouseState = MouseState.dead
    public mission: MouseMission

    /**
     * @param index from 0 to `count - 1`
     * @param count number of mice
     */
    constructor(private readonly context: Context) {
        this.reborn()
    }

    anim(time: number, delta: number) {
        const { state } = this
        this.col = Math.floor(time * this.speed * 8) % 4
        if (state === MouseState.dead) {
            // Put the mouse out of the screen to hide it.
            this.x = 999
            return
        }

        const shift = this.speed * delta
        this.y += shift
        if (this.y > 0) {
            // The mouse passed the line.
            if (state === MouseState.alive) {
                this.state = MouseState.escaping
                // This event can change the state to "dead".
                this.context.fireMouseNearCat(this)
            } else if (state === MouseState.escaping) {
                this.state = MouseState.escaped
                this.context.fireMouseEscaped(this)
            }
        }
        if (this.y > 0.5) {
            this.reborn()
        }
    }

    private reborn() {
        const mission = this.context.getNextMission()
        this.mission = mission
        this.state = MouseState.alive
        this.column = mission.column
        this.x = 2 * ((mission.column + 0.5) / COLUMNS) - 1
        this.y = -mission.time * mission.speed
        this.speed = mission.speed
        this.row = mission.bonus ? 2 : 1
    }

    getColumn() {
        return this.column
    }

    swallowed() {
        this.state = MouseState.dead
        this.reborn()
    }
}
