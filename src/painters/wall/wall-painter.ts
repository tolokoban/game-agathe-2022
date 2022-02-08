import { MARGIN, SPEED } from "./../../constants"
import BaseWallPainter from "./base-wall-painter"
import { createTextureFromImageRepeat } from "../../webgl/texture"

const X = 1 - MARGIN
const SPEED_WALL = (SPEED * (2 * (1 - MARGIN))) / MARGIN

export default class WallPainter extends BaseWallPainter {
    private readonly texture: WebGLTexture

    constructor(
        gl: WebGLRenderingContext,
        image: HTMLImageElement | HTMLCanvasElement
    ) {
        super(gl)
        this.texture = createTextureFromImageRepeat(gl, image)
        const data = WallPainter.createDataArray(4)
        const Y = 1.1
        WallPainter.pokeData(data, 0, -1, +Y, 1, 0)
        WallPainter.pokeData(data, 1, -X, +1, 1, 1)
        WallPainter.pokeData(data, 2, -1, -Y, 0, 0)
        WallPainter.pokeData(data, 3, -X, -1, 0, 1)
        this.pushData(data)
    }

    anim(time: number) {}

    protected actualPaint(time: number): void {
        const { gl } = this
        const { width, height } = gl.canvas
        gl.disable(gl.BLEND)
        gl.disable(gl.DEPTH_TEST)
        this.$uniTexture(this.texture)
        this.$uniScreen(width, height)
        this.$uniShrink(2 * MARGIN)
        this.$uniSpeed(SPEED_WALL)
        this.$uniTime(time)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    protected actualDestroy(): void {
        const { gl } = this
        gl.deleteTexture(this.texture)
    }
}
