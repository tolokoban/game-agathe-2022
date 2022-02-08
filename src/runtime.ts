import Cat from "./agents/cat"
import Painter from "./painters/painter"
import SpritePainter from "./painters/sprite"

export default class Runtime implements Painter {
    private readonly painter: SpritePainter
    private readonly cat: Cat
    private lastTime = 0

    constructor(
        private readonly gl: WebGLRenderingContext,
        spritesTexture: HTMLImageElement
    ) {
        const cat = new Cat()
        this.cat = cat
        gl.canvas.addEventListener("pointerdown", cat.onPointerMove)
        gl.canvas.addEventListener("pointermove", cat.onPointerMove)
        const spritePainter = new SpritePainter(gl, spritesTexture, [cat])
        this.painter = spritePainter
    }

    paint(time: number): void {
        this.painter.paint(time)
    }

    anim(time: number): void {
        if (this.lastTime > 0) {
            const delta = time - this.lastTime
            this.cat.anim(delta)
            this.painter.anim(time)
        }
        this.lastTime = time
    }

    destroy(): void {
        this.gl.canvas.addEventListener("pointerdown", this.cat.onPointerMove)
        this.gl.canvas.addEventListener("pointermove", this.cat.onPointerMove)
    }
}
