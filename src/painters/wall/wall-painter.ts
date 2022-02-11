import { MARGIN, SPEED } from "./../../constants"
import BaseWallPainter from "./base-wall-painter"
import { createTextureFromImageRepeat } from "../../webgl/texture"

const SHRINK = 1 - MARGIN

export default class WallPainter extends BaseWallPainter {
    private readonly texture: WebGLTexture
    private readonly speed

    constructor(
        gl: WebGLRenderingContext,
        image: HTMLImageElement | HTMLCanvasElement
    ) {
        super(gl)
        this.texture = createTextureFromImageRepeat(gl, image)
        const data = WallPainter.createDataArray(12)
        const perspective = 1.2
        const Wa = 1
        const Wb = perspective
        const Xa = 1
        const Xb = SHRINK * perspective
        const Ya = perspective
        const Yb = Ya
        const U0 = 0
        const U1 = 1
        const V0 = 0
        const V1 = 1
        let idx = 0
        WallPainter.pokeData(data, idx++, -Xa, +Ya, Wa, U1, V0)
        WallPainter.pokeData(data, idx++, -Xb, +Yb, Wb, U1, V1)
        WallPainter.pokeData(data, idx++, -Xa, -Ya, Wa, U0, V0)
        WallPainter.pokeData(data, idx++, -Xb, +Yb, Wb, U1, V1)
        WallPainter.pokeData(data, idx++, -Xa, -Ya, Wa, U0, V0)
        WallPainter.pokeData(data, idx++, -Xb, -Yb, Wb, U0, V1)
        //------------------------------------------------------
        WallPainter.pokeData(data, idx++, Xa, +Ya, Wa, U1, V0)
        WallPainter.pokeData(data, idx++, Xb, +Yb, Wb, U1, V1)
        WallPainter.pokeData(data, idx++, Xa, -Ya, Wa, U0, V0)
        WallPainter.pokeData(data, idx++, Xb, +Yb, Wb, U1, V1)
        WallPainter.pokeData(data, idx++, Xa, -Ya, Wa, U0, V0)
        WallPainter.pokeData(data, idx++, Xb, -Yb, Wb, U0, V1)
        this.pushDataArray(data)
        for (let i = 0; i < 4; i++) {
            console.log(data.subarray(i * 5, (i + 1) * 5))
        }
        this.speed = (SPEED * (1 - MARGIN)) / MARGIN
    }

    anim(time: number) {}

    protected actualPaint(time: number): void {
        const { gl } = this
        const { width, height } = gl.canvas
        gl.disable(gl.BLEND)
        gl.disable(gl.DEPTH_TEST)
        this.$uniTexture(this.texture)
        this.$uniScreen(width, height)
        this.$uniShrink(SHRINK)
        this.$uniSpeed(this.speed)
        this.$uniTime(time)
        gl.drawArrays(gl.TRIANGLES, 0, 12)
    }

    protected actualDestroy(): void {
        const { gl } = this
        gl.deleteTexture(this.texture)
    }
}
