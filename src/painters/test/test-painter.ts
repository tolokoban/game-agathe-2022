import BaseTestPainter from "./base-test-painter"

export default class TestPainter extends BaseTestPainter {
    constructor(gl: WebGLRenderingContext) {
        super(gl)
        const data = TestPainter.createDataArray(4)
        let idx = 0
        TestPainter.pokeData(data, idx++, 0, +1, 1, 0, 0)
        TestPainter.pokeData(data, idx++, -1, 0, 0, 1, 0)
        TestPainter.pokeData(data, idx++, +1, 0, 0, 0, 1)
        TestPainter.pokeData(data, idx++, 0, -1, 1, 0, 0)
        this.pushDataArray(data)
    }

    public anim(time: number): void {}
    protected actualPaint(time: number): void {
        const { gl } = this
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    protected actualDestroy(): void {}
}
