/**
 * This file has been generatged automatically on 2022-02-11T09:39:13.775Z
 * Please extends this abstract class to have it work.
 */
export default abstract class BasePainter {
    private static VERT = `// Screen width and height.
uniform vec2 uniScreen;
// Shrink factor of the corridor compared to the screen width.
uniform float uniShrink;

attribute vec2 attPos;
attribute float attSize;
attribute vec2 attUV;

varying vec2 varUV;

void main() {
    varUV = attUV;
    float w = uniScreen.x * uniShrink;
    float h = uniScreen.y;
    gl_PointSize = attSize * w;
    float ratio = w / h;
    gl_Position = vec4( 
        attPos.x * uniShrink, 
        attPos.y * 2.0 * ratio + 1.0 - ratio * 0.75, 
        1.0, 1.0 
    );
}`
    private static FRAG = `precision mediump float;

// Atlas of 8x8 sprites.
uniform sampler2D uniTexture;

// Size of a a side of a square tile in the sprites' atlas.
const float TILE = 1.0 / 4.0;

varying vec2 varUV;

void main() {
  gl_FragColor = texture2D( uniTexture, varUV + TILE * gl_PointCoord );
}`
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
        attSize: number,
        attUV_X: number,
        attUV_Y: number
    ) {
        let index = vertexIndex * BasePainter.ATTRIBS_COUNT
        ;(data[index++] = attPos_X),
            (data[index++] = attPos_Y),
            (data[index++] = attSize),
            (data[index++] = attUV_X),
            (data[index++] = attUV_Y)
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
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
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

    public $uniShrink(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniShrink")
        gl.uniform1f(location, value)
    }

    public $uniScreen(x: number, y: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniScreen")
        gl.uniform2f(location, x, y)
    }

    public $uniTexture(texture: WebGLTexture) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniTexture")
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1i(location, 0)
    }

    public paint(time: number) {
        const { gl, prg } = this
        gl.useProgram(prg)
        const BPE = Float32Array.BYTES_PER_ELEMENT
        const stride = BasePainter.ATTRIBS_COUNT * BPE
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuff)
        // attPos
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0 * BPE)
        // attSize
        gl.enableVertexAttribArray(1)
        gl.vertexAttribPointer(1, 1, gl.FLOAT, false, stride, 2 * BPE)
        // attUV
        gl.enableVertexAttribArray(2)
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, stride, 3 * BPE)
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
