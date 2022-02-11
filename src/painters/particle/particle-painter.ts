import BaseParticlePainter from "./base-particle-painter"

const PARTICLES_COUNT = 500

export default class ParticlePainter extends BaseParticlePainter {
    private readonly data: Float32Array
    private currentVertexIndex = 0
    private x = 0
    private y = 0

    constructor(gl: WebGLRenderingContext) {
        super(gl)
        const data = ParticlePainter.createDataArray(PARTICLES_COUNT)
        for (
            let vertexIndex = 0;
            vertexIndex < PARTICLES_COUNT;
            vertexIndex++
        ) {
            ParticlePainter.pokeData(
                data,
                vertexIndex,
                999, // attInitialPosition_X
                999, // attInitialPosition_Y
                0, // attInitialSpeed_X
                0, // attInitialSpeed_Y
                0 // attBirthTime
            )
        }
        this.data = data
        this.pushData(this.data)
        window.document.addEventListener(
            "pointermove",
            (evt) => {
                const w = window.screen.availWidth
                const h = window.screen.availHeight
                this.x = (2 * evt.clientX) / w - 1
                this.y = 1 - (2 * evt.clientY) / h
            },
            true
        )
    }

    public anim(time: number): void {
        const vertexIndex = this.currentVertexIndex
        const attInitialPosition_X = this.x
        const attInitialPosition_Y = this.y
        const angle = Math.random() * 0.4 - 0.2
        const length = (Math.random() + 2) * 0.0004
        const attInitialSpeed_X = length * Math.sin(angle)
        const attInitialSpeed_Y = length * Math.cos(angle)
        const attBirthTime = time
        ParticlePainter.pokeData(
            this.data,
            vertexIndex,
            attInitialPosition_X,
            attInitialPosition_Y,
            attInitialSpeed_X,
            attInitialSpeed_Y,
            attBirthTime
        )
        this.currentVertexIndex = (vertexIndex + 1) % PARTICLES_COUNT
        this.pushDataSubArray(this.data, vertexIndex, vertexIndex + 1)
    }

    protected actualPaint(time: number): void {
        const { gl } = this
        gl.disable(gl.DEPTH_TEST)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        this.$uniTime(time)
        gl.drawArrays(gl.POINTS, 0, PARTICLES_COUNT)
    }

    protected actualDestroy(): void {}
}
