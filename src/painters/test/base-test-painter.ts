/**
 * This file has been generatged automatically on 2022-02-15T14:59:26.360Z
 * Please extends this abstract class to have it work.
 */
export default abstract class BasePainter {
    private static VERT = `precision lowp float;
attribute vec2 attPos;
attribute vec3 attColor;
varying vec3 varColor;
void main(){varColor=attColor;
gl_Position=vec4(attPos.x,attPos.y,0.0,1.0);}`
    private static FRAG = `precision lowp float;
varying vec3 varColor;
void main(){gl_FragColor=vec4(varColor,1.0);}`
    private static ATTRIBS_COUNT = 5
    protected readonly prg: WebGLProgram
    protected readonly vertBuff: WebGLBuffer

    protected constructor(protected readonly gl: WebGLRenderingContext) {
        const vertBuff = gl.createBuffer()
        if (!vertBuff) throw Error("Unable to create WebGL Buffer!")

        const prg = gl.createProgram()
        if (!prg) throw Error("Unable to create a WebGL Program!")

        const vertShader = BasePainter.createShader(
            gl,
            gl.VERTEX_SHADER,
            BasePainter.VERT
        )
        const fragShader = BasePainter.createShader(
            gl,
            gl.FRAGMENT_SHADER,
            BasePainter.FRAG
        )
        gl.attachShader(prg, vertShader)
        gl.attachShader(prg, fragShader)
        gl.linkProgram(prg)
        this.prg = prg
        this.vertBuff = vertBuff
    }

    public destroy() {
        const { gl, prg, vertBuff } = this
        gl.deleteBuffer(vertBuff)
        gl.deleteProgram(prg)
        this.actualDestroy()
    }

    public static createDataArray(vertexCount: number): Float32Array {
        return new Float32Array(vertexCount * 5)
    }

    public static pokeData(
        data: Float32Array,
        vertexIndex: number,
        attPos_X: number,
        attPos_Y: number,
        attColor_X: number,
        attColor_Y: number,
        attColor_Z: number
    ) {
        let index = vertexIndex * BasePainter.ATTRIBS_COUNT
        ;(data[index++] = attPos_X),
            (data[index++] = attPos_Y),
            (data[index++] = attColor_X),
            (data[index++] = attColor_Y),
            (data[index++] = attColor_Z)
    }

    public static swapData(data: Float32Array, indexA: number, indexB: number) {
        let ptrA = indexA * BasePainter.ATTRIBS_COUNT
        let ptrB = indexB * BasePainter.ATTRIBS_COUNT
        let tmp: number = 0
        tmp = data[ptrA]
        data[ptrA++] = data[ptrB]
        data[ptrB++] = tmp
        tmp = data[ptrA]
        data[ptrA++] = data[ptrB]
        data[ptrB++] = tmp
        tmp = data[ptrA]
        data[ptrA++] = data[ptrB]
        data[ptrB++] = tmp
        tmp = data[ptrA]
        data[ptrA++] = data[ptrB]
        data[ptrB++] = tmp
        tmp = data[ptrA]
        data[ptrA++] = data[ptrB]
        data[ptrB++] = tmp
    }

    public pushDataArray(data: Float32Array) {
        const { gl, vertBuff } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    }

    /**
     * @param start First vertex index to push
     * @param end First vertex index to NOT push.
     */
    public pushDataSubArray(data: Float32Array, start: number, end: number) {
        const { gl, vertBuff } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff)
        const N = BasePainter.ATTRIBS_COUNT
        const subData = data.subarray(start * N, end * N)
        gl.bufferSubData(
            gl.ARRAY_BUFFER,
            start * Float32Array.BYTES_PER_ELEMENT * N,
            subData
        )
    }

    public paint(time: number) {
        const { gl, prg } = this
        gl.useProgram(prg)
        const BPE = Float32Array.BYTES_PER_ELEMENT
        const stride = BasePainter.ATTRIBS_COUNT * BPE
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuff)
        // attPos
        const attPos = gl.getAttribLocation(prg, "attPos")
        gl.enableVertexAttribArray(attPos)
        gl.vertexAttribPointer(attPos, 2, gl.FLOAT, false, stride, 0 * BPE)
        // attColor
        const attColor = gl.getAttribLocation(prg, "attColor")
        gl.enableVertexAttribArray(attColor)
        gl.vertexAttribPointer(attColor, 3, gl.FLOAT, false, stride, 2 * BPE)
        this.actualPaint(time)
    }

    /**
     * This method should be called after all the painters have their
     * `paint()` method been called.
     * It deals with everything taking time and not drawing anything.
     */
    public abstract anim(time: number): void

    protected abstract actualPaint(time: number): void

    protected abstract actualDestroy(): void

    private static createShader(
        gl: WebGLRenderingContext,
        type: number,
        code: string
    ) {
        const shader = gl.createShader(type)
        if (!shader) throw Error("Unable to create WebGL Shader!")

        gl.shaderSource(shader, code)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(code)
            console.error(
                "An error occurred compiling the shader: ",
                gl.getShaderInfoLog(shader)
            )
            throw Error(
                gl.getShaderInfoLog(shader) ??
                    "Unknow error while compiling the shader!"
            )
        }
        return shader
    }
}
