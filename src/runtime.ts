import { MOUSE_COUNT } from "./constants"
import Cat from "./agents/cat"
import Mouse from "./agents/mouse"
import Painter from "./painters/painter"
import SpritePainter from "./painters/sprite"

export default class Runtime implements Painter {
    private readonly painter: SpritePainter
    private readonly cat: Cat
    private readonly mice: Mouse[] = []

    private lastTime = 0

    constructor(
        private readonly gl: WebGLRenderingContext,
        spritesTexture: HTMLImageElement
    ) {
        const cat = new Cat()
        this.cat = cat
        for (let i = 0; i < MOUSE_COUNT; i++) {
            this.mice.push(new Mouse(i, MOUSE_COUNT))
        }
        gl.canvas.addEventListener("pointerdown", cat.onPointerMove)
        gl.canvas.addEventListener("pointermove", cat.onPointerMove)
        const spritePainter = new SpritePainter(gl, spritesTexture, [
            ...this.mice,
            cat,
        ])
        this.painter = spritePainter
    }

    paint(time: number): void {
        this.painter.paint(time)
    }

    anim(time: number): void {
        if (this.lastTime > 0) {
            const delta = time - this.lastTime
            this.cat.anim(delta)
            for (const mouse of this.mice) {
                mouse.anim(delta)
            }
            this.painter.anim(time)
        }
        this.lastTime = time
    }

    destroy(): void {
        this.gl.canvas.addEventListener("pointerdown", this.cat.onPointerMove)
        this.gl.canvas.addEventListener("pointermove", this.cat.onPointerMove)
    }
}
