import { MOUSE_COUNT } from "../constants"
import Cat from "../agents/cat"
import Mouse from "../agents/mouse"
import Painter from "../painters/painter"
import SpritePainter from "../painters/sprite"
import MissionFactory from "./mission-factory"

export default class Runtime implements Painter {
    private readonly painter: SpritePainter
    private readonly cat: Cat
    private readonly mice: Mouse[] = []
    private readonly missionsFactory: MissionFactory

    private lastTime = 0

    constructor(
        time: number,
        private readonly gl: WebGLRenderingContext,
        spritesTexture: HTMLImageElement
    ) {
        this.missionsFactory = new MissionFactory(time)
        const cat = new Cat()
        this.cat = cat
        for (let i = 0; i < MOUSE_COUNT; i++) {
            this.mice.push(
                new Mouse(
                    this.getNextMission,
                    this.handleMousePassedTheLine,
                    this.handleMouseEscasped
                )
            )
        }
        window.document.addEventListener("keydown", cat.onKeyDown, true)
        gl.canvas.addEventListener("pointerdown", cat.onPointerMove)
        gl.canvas.addEventListener("pointermove", cat.onPointerMove)
        const spritePainter = new SpritePainter(gl, spritesTexture, [
            ...this.mice,
            cat,
        ])
        this.painter = spritePainter
    }

    private readonly getNextMission = () =>
        this.missionsFactory.getNextMission(this.lastTime)

    private handleMousePassedTheLine = (mouse: Mouse) => {
        console.log(mouse.getColumn() + 1)
        if (mouse.getColumn() === this.cat.getColumn()) {
            mouse.swallowed()
            this.cat.miam()
        }
    }

    private handleMouseEscasped = (mouse: Mouse) => {
        // console.log(`A mouse has escaped!`)
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
        this.gl.canvas.addEventListener("pointerdown", this.cat.onPointerMove)
        this.gl.canvas.addEventListener("pointermove", this.cat.onPointerMove)
        window.document.removeEventListener("keydown", this.cat.onKeyDown, true)
    }
}
