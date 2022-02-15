import { MARGIN, SPEED } from "./../../constants"
import BaseBackgroundPainter from "./base-background-painter"
import { createTextureFromImageRepeat } from "../../webgl/texture"

const SHRINK = 1 - MARGIN

export default class BackgroundPainter extends BaseBackgroundPainter {
    private readonly texture: WebGLTexture

    constructor(
        gl: WebGLRenderingContext,
        image: HTMLImageElement | HTMLCanvasElement
    ) {
        super(gl)
        this.texture = createTextureFromImageRepeat(gl, image)
        const data = BackgroundPainter.createDataArray(4)
        BackgroundPainter.pokeData(data, 0, -SHRINK, +1, 0, 0)
        BackgroundPainter.pokeData(data, 1, +SHRINK, +1, 1, 0)
        BackgroundPainter.pokeData(data, 2, -SHRINK, -1, 0, 1)
        BackgroundPainter.pokeData(data, 3, +SHRINK, -1, 1, 1)
        this.pushDataArray(data)
    }

    anim(time: number) {}

    protected actualPaint(time: number): void {
        const { gl } = this
        const { width, height } = gl.canvas
        // gl.disable(gl.BLEND)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)
        this.$uniTexture(this.texture)
        this.$uniScreen(width, height)
        this.$uniShrink(SHRINK)
        this.$uniSpeed(SPEED)
        this.$uniTime(time)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    protected actualDestroy(): void {
        const { gl } = this
        gl.deleteTexture(this.texture)
    }
}
