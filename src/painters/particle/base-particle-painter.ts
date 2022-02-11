/**
 * This file has been generatged automatically on 2022-02-10T15:07:22.836Z
 * Please extends this abstract class to have it work.
 */
export default abstract class BasePainter {
    protected readonly prg: WebGLProgram
    protected readonly vertBuff: WebGLBuffer

    protected constructor(protected readonly gl: WebGLRenderingContext) {
        const vertBuff = gl.createBuffer()
        if (!vertBuff) throw Error("Unable to create WebGL Buffer!")

        const prg = gl.createProgram()
        if (!prg) throw Error("Unable to create a WebGL Program!")

        const vertShader = createShader(gl, gl.VERTEX_SHADER, VERT)
        const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
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
        attInitialPosition_X: number,
        attInitialPosition_Y: number,
        attInitialSpeed_X: number,
        attInitialSpeed_Y: number,
        attBirthTime: number
    ) {
        let index = vertexIndex * 5
        ;(data[index++] = attInitialPosition_X),
            (data[index++] = attInitialPosition_Y),
            (data[index++] = attInitialSpeed_X),
            (data[index++] = attInitialSpeed_Y),
            (data[index++] = attBirthTime)
    }

    public static swapData(data: Float32Array, indexA: number, indexB: number) {
        let ptrA = indexA * 5
        let ptrB = indexB * 5
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

    public pushData(data: Float32Array) {
        const { gl, vertBuff } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
    }

    public pushDataSubArray(data: Float32Array, start: number, end: number) {
        const { gl, vertBuff } = this
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff)
        const subData = data.subarray(start * 5, end * 5)
        gl.bufferSubData(
            gl.ARRAY_BUFFER, 
            start * Float32Array.BYTES_PER_ELEMENT * 5,
            subData
        )
    }

    protected $uniTime(value: number) {
        const { gl, prg } = this
        const location = gl.getUniformLocation(prg, "uniTime")
        gl.uniform1f(location, value)
    }

    public paint(time: number) {
        const { gl, prg } = this
        gl.useProgram(prg)
        const BPE = Float32Array.BYTES_PER_ELEMENT
        const stride = 5 * BPE
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuff)
        // attInitialPosition
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0 * BPE)
        // attInitialSpeed
        gl.enableVertexAttribArray(1)
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 2 * BPE)
        // attBirthTime
        gl.enableVertexAttribArray(2)
        gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 4 * BPE)
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
}

function createShader(gl: WebGLRenderingContext, type: number, code: string) {
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

const VERT = `uniform float uniTime;

attribute vec2 attInitialPosition;
attribute vec2 attInitialSpeed;
attribute float attBirthTime;

varying vec3 varColor;

const vec2 GRAVITY = vec2(0, -1) * 0.0000005;
const vec3 YELLOW = vec3(1.0, 1.0, 0.1);
const vec3 RED = vec3(0.8, 0.0, 0.0);

void main() {
    float t = uniTime - attBirthTime;
    float t2 = t * t;
    gl_Position = vec4(
        t2 * GRAVITY + t * attInitialSpeed + attInitialPosition,
        0.5, 1.0
    );
    gl_PointSize = 128.0 - 0.02 * t;
    float life = clamp(t * 0.005, 0.0, 1.0);
    float light = 11.0 - 10.0 * life * life;
    varColor = light * mix(YELLOW, RED, life);
}`

const FRAG = `precision mediump float;

varying vec3 varColor;

void main() {
    float x = 2.0 * gl_PointCoord.x - 1.0;
    float y = 2.0 * gl_PointCoord.y - 1.0;
    float radius = x*x + y*y;
    if (radius > 1.0) discard;
    
    float opacity = 1.0 - radius;
    gl_FragColor = vec4(varColor, 0.18 * opacity);
}
`
