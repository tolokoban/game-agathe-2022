export interface Painter {
    paint(time: number): void
    anim(time: number): void
}

export default class Scene {
    public readonly gl: WebGLRenderingContext
    private painters: Painter[] = []
    private playing = false
    private lastCanvasWidth = 0
    private lastCanvasheight = 0

    constructor(private readonly canvas: HTMLCanvasElement, options?: WebGLContextAttributes) {
        const gl = canvas.getContext("webgl", )
        if (!gl) throw Error("Unable to create WebGL Context!")

        this.gl = gl
    }

    public setPainters(painters: Painter[]) {
        this.painters = painters
    }

    public paint = (time: number) => {
        const {gl}=this
        const {canvas}=gl
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        if (width !== this.lastCanvasWidth || height !== this.lastCanvasheight) {
            this.lastCanvasWidth = width
            this.lastCanvasheight= height
            canvas.setAttribute("width", `${width}`)
            canvas.setAttribute("height", `${height}`)
            gl.viewport(0, 0, width, height)
        }

        for (const painter of this.painters) {
            painter.paint(time)
        }
    }

    public anim = (time: number) => {
        for (const painter of this.painters) {
            painter.anim(time)
        }
    }

    public play() {
        if (this.playing) return

        this.playing = true
        const animation = (time: number) => {
            this.paint(time)
            this.anim(time)
            if (this.playing) window.requestAnimationFrame(animation)
        }
        window.requestAnimationFrame(animation)
    }

    public stop() {
        this.playing = false
    }

    public resize(width: number, height: number) {
        window.requestAnimationFrame(() => {
            const { gl, canvas } = this
            canvas.setAttribute("width", `${width}`)
            canvas.setAttribute("height", `${height}`)
            gl.viewport(0, 0, width, height)
        })
    }
}
