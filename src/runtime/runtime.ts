import { MOUSE_COUNT } from "../constants"
import Cat from "../agents/cat"
import Mouse from "../agents/mouse"
import Painter from "../painters/painter"
import SpritePainter from "../painters/sprite"
import MissionFactory from "./mission-factory"
import { Context } from "../types"
import GenericEvent from "../event"
import { printHighscore, printLives, printScore, printWarning } from "../ui"

export default class Runtime implements Painter, Context {
    public readonly eventGameOver = new GenericEvent<{ success: boolean }>()

    private readonly painter: SpritePainter
    private readonly cat: Cat
    private readonly mice: Mouse[] = []
    private readonly missionsFactory: MissionFactory
    private gameover = false
    private score = 0
    private lives = 3

    private lastTime = 0

    constructor(
        time: number,
        private readonly gl: WebGLRenderingContext,
        spritesTexture: HTMLImageElement
    ) {
        this.lastTime = time
        this.missionsFactory = new MissionFactory(this)
        const cat = new Cat()
        this.cat = cat
        for (let i = 0; i < MOUSE_COUNT; i++) {
            this.mice.push(new Mouse(this))
        }
        window.document.addEventListener("keydown", cat.onKeyDown, true)
        window.document.addEventListener("pointerdown", cat.onPointerEvent, true)
        window.document.addEventListener("pointermove", cat.onPointerEvent, true)
        const spritePainter = new SpritePainter(gl, spritesTexture, [
            ...this.mice,
            cat,
        ])
        this.painter = spritePainter
        printScore(0)
        printLives(this.lives)
    }

    public get time() {
        return this.lastTime
    }

    public fireCongrats(): void {
        this.eventGameOver.fire({ success: true })
    }

    public fireExtraLife(): void {
        if (this.gameover) return

        printLives(++this.lives)
        printWarning("Extra life", 1200)
    }

    public fireMouseEscaped(mouse: Mouse): void {
        if (this.lives <= 0) return

        const lives = --this.lives
        printLives(lives)
        if (lives > 0) {
            printWarning("A mouse escaped!", 500)
        } else {
            this.gameover = true
            printHighscore(this.score)
            printWarning("Game Over", 4000)
            window.setTimeout(() => {
                this.eventGameOver.fire({ success: false })
            }, 3000)
        }
    }

    public fireMouseNearCat(mouse: Mouse): void {
        if (this.gameover) return

        printScore(++this.score)
        if (mouse.getColumn() === this.cat.getColumn()) {
            if (mouse.mission.bonus) {
                this.fireExtraLife()
            }
            mouse.swallowed()
            this.cat.miam()
        }
    }

    public getNextMission() {
        return this.missionsFactory.getNextMission(this.lastTime)
    }

    paint(time: number): void {
        this.painter.paint(time)
    }

    anim(time: number): void {
        if (this.lastTime > 0) {
            const delta = time - this.lastTime
            this.cat.anim(time, delta)
            for (const mouse of this.mice) {
                mouse.anim(time, delta)
            }
            this.painter.anim(time)
        }
        this.lastTime = time
    }

    destroy(): void {
        window.document.addEventListener("pointerdown", this.cat.onPointerEvent, true)
        window.document.addEventListener("pointermove", this.cat.onPointerEvent, true)
        window.document.removeEventListener("keydown", this.cat.onKeyDown, true)
    }
}
