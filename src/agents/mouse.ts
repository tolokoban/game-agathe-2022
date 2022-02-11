import { COLUMNS, SPEED } from "../constants"
import { Sprite } from "../painters/sprite"
import { rand } from "../tools"

const SPEED_MOUSE = SPEED * 1
const TOP = 0.2
const BOTTOM = -1
// Mice are spread on this distance
const SPREAD = Math.abs(TOP - BOTTOM)

export default class Cat implements Sprite {
    col: number = 0
    row: number = 1
    x: number = snap(rand(0, 1))
    y: number = 0
    size: number = 1 / COLUMNS
    private speed = 1

    constructor(index: number, count: number) {
        this.y = BOTTOM + (SPREAD * index) / count
    }

    anim(delta: number) {
        const shift = SPEED * this.speed * delta
        this.y += shift
        if (this.y > TOP) {
            this.y = BOTTOM + this.y - TOP
            this.x = snap(rand(0, 1))
        }
    }
}

function snap(x: number) {
    return -1 + (2 * (Math.floor(COLUMNS * x) + 0.5)) / COLUMNS
}
