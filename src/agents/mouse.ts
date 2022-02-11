import { COLUMNS } from "../constants"
import { Sprite } from "../painters/sprite"
import { rand } from "../tools"
import { MouseMission } from "../types"

enum MouseState {
    dead = 0,
    alive = 1,
    escaping = 2,
    escaped = 3,
}

export default class Mouse implements Sprite {
    col: number = 0
    row: number = 1
    x: number = 0
    y: number = 0
    size: number = 1 / COLUMNS
    private column = 0
    private speed = rand(1, 3)
    private state: MouseState = MouseState.dead

    /**
     * @param index from 0 to `count - 1`
     * @param count number of mice
     */
    constructor(
        private readonly getMission: () => MouseMission,
        private readonly onPassedTheLine: (mouse: Mouse) => void,
        private readonly onEscaped: (mouse: Mouse) => void
    ) {
        this.reborn()
    }

    anim(time: number, delta: number) {
        const { state } = this
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
                this.onPassedTheLine(this)
            } else if (state === MouseState.escaping) {
                this.state = MouseState.escaped
                this.onEscaped(this)
            }
        }
        if (this.y > 0.5) {
            this.reborn()
        }
    }

    private reborn() {
        const { column, time, speed } = this.getMission()
        this.state = MouseState.alive
        this.column = column
        this.x = 2 * ((column + 0.5) / COLUMNS) - 1
        this.y = -time * speed
        this.speed = speed
    }

    getColumn() {
        return this.column
    }

    swallowed() {
        this.state = MouseState.dead
        this.reborn()
    }
}
