import { COLUMNS } from "./../constants"
import { Sprite } from "../painters/sprite"
import { clamp } from "../tools"

const SPEED = 0.008

export default class Cat implements Sprite {
    col: number = 0
    row: number = 0
    x: number = 0
    y: number = 0
    size: number = 1 / COLUMNS

    private target = 0

    readonly onPointerMove = (event: PointerEvent) => {
        const width = (event.target as HTMLElement).clientWidth
        const percent = clamp(event.clientX / width)
        this.target = -1 + (2 * (Math.floor(COLUMNS * percent) + 0.5)) / COLUMNS
    }

    anim(delta: number) {
        const shift = SPEED * delta
        if (this.target < this.x) {
            this.x = Math.max(this.target, this.x - shift)
        } else {
            this.x = Math.min(this.target, this.x + shift)
        }
    }
}

