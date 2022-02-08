import { MARGIN } from "../../constants"
import { createTextureFromImage } from "../../webgl/texture"
import BaseSpritePainter from "./base-sprite-painter"

export interface Sprite {
    /** Column of this sprite in the atlas */
    readonly col: number
    readonly row: number
    readonly x: number
    readonly y: number
    readonly size: number
}

const ATLAS_SIDE = 1 / 8
const SHRINK = 1 - MARGIN


export default class SpritePainter extends BaseSpritePainter {
    private readonly texture: WebGLTexture
    private readonly data: Float32Array

    constructor(
        gl: WebGLRenderingContext,
        image: HTMLImageElement | HTMLCanvasElement,
        private readonly sprites: Sprite[]
    ) {
        super(gl)
        this.texture = createTextureFromImage(gl, image)
        this.data = SpritePainter.createDataArray(sprites.length)
        this.updateData()
    }

    public anim(time: number): void {
        this.updateData()
    }

    protected actualPaint(time: number): void {
        const { gl } = this
        const { width, height } = gl.canvas
        gl.disable(gl.DEPTH_TEST)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        this.$uniTexture(this.texture)
        this.$uniShrink(SHRINK)
        this.$uniScreen(width, height)
        gl.drawArrays(gl.POINTS, 0, this.sprites.length)
    }

    protected actualDestroy(): void {
        const { gl } = this
        gl.deleteTexture(this.texture)
    }

    private updateData() {
        const { data } = this
        let vertexIndex = 0
        for (const sprite of this.sprites) {
            SpritePainter.pokeData(
                data,
                vertexIndex++,
                sprite.x,
                sprite.y,
                sprite.size,
                sprite.col * ATLAS_SIDE,
                sprite.row * ATLAS_SIDE
            )
        }
        this.pushData(data)
    }
}
