import { COLUMNS } from "./../constants"
import { Sprite } from "../painters/sprite"
import { clamp } from "../tools"
import { makeBounceAlpha } from "../alpha"

const SPEED = 0.008
const BASE_SIZE = 1.3 / COLUMNS
const ANIM_DURATION = 200

export default class Cat implements Sprite {
    col: number = 0
    row: number = 0
    x: number = 0
    y: number = 0
    size: number = BASE_SIZE

    private readonly bounceAlpha = makeBounceAlpha(0.5, ANIM_DURATION)
    private time = 0
    private target = 0
    private effect?: (time: number) => void

    readonly onPointerMove = (event: PointerEvent) => {
        const element = event.target as HTMLElement
        const rect = element.getBoundingClientRect()
        const { left, width } = rect
        const percent = clamp((event.clientX - left) / width)
        this.target = -1 + (2 * (Math.floor(COLUMNS * percent) + 0.5)) / COLUMNS
    }

    readonly onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            const column = this.getColumn()
            if (column < COLUMNS - 1) {
                this.target = col2x(column + 1)
            }
        } else if (event.key === "ArrowLeft") {
            const column = this.getColumn()
            if (column > 0) {
                this.target = col2x(column - 1)
            }
        }
    }

    getColumn() {
        return Math.floor(COLUMNS * ((1 + this.x) * 0.5))
    }

    anim(time: number, delta: number) {
        this.time = time
        const shift = SPEED * delta
        if (this.target < this.x) {
            this.x = Math.max(this.target, this.x - shift)
        } else {
            this.x = Math.min(this.target, this.x + shift)
        }
        if (this.effect) this.effect(time)
    }

    miam() {
        const t0 = this.time
        this.effect = (time: number) => {
            const alpha = this.bounceAlpha(time - t0)
            this.size = BASE_SIZE * (1 + alpha)
            this.col = alpha > 0 ? 1 : 0
        }
    }
}

function col2x(column: number) {
    return -1 + (2 * (column + 0.5)) / COLUMNS
}
