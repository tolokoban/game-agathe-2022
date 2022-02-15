import { printWarning } from "../../ui"

export interface Painter {
    paint(time: number): void
    anim(time: number): void
}

interface ObservableSize {
    inlineSize: number
    blockSize: number
}

interface ExtendedResizeObserverEntry extends ResizeObserverEntry {
    devicePixelContentBoxSize: ObservableSize[]
}

export default class Scene {
    public readonly gl: WebGLRenderingContext
    private painters: Painter[] = []
    private playing = false
    private lastCanvasWidth = -1
    private lastCanvasheight = -1
    private displayWidth = 0
    private displayHeight = 0

    constructor(
        private readonly canvas: HTMLCanvasElement,
        options?: WebGLContextAttributes
    ) {
        const gl = canvas.getContext("webgl")
        if (!gl) throw Error("Unable to create WebGL Context!")

        gl.depthRange(0, 1)
        gl.disable(gl.SCISSOR_TEST)
        gl.disable(gl.DEPTH_TEST)
        gl.disable(gl.STENCIL_TEST)
        this.gl = gl
        const observer = new ResizeObserver((entries) => {
            for (const rawEntry of entries) {
                const entry = rawEntry as ExtendedResizeObserverEntry
                const { target } = entry
                if (target !== gl.canvas) continue

                let width = 0
                let height = 0
                let dpr = Math.min(2, window.devicePixelRatio)
                if (entry.devicePixelContentBoxSize) {
                    width = entry.devicePixelContentBoxSize[0].inlineSize
                    height = entry.devicePixelContentBoxSize[0].blockSize
                    dpr = 1 // it's already in width and height
                } else if (
                    Array.isArray(entry.contentBoxSize) &&
                    entry.contentBoxSize.length > 0
                ) {
                    width = entry.contentBoxSize[0].inlineSize
                    height = entry.contentBoxSize[0].blockSize
                } else {
                    width = entry.contentRect.width
                    height = entry.contentRect.height
                }
                this.displayWidth = Math.round(width * dpr)
                this.displayHeight = Math.round(height * dpr)
            }
        })
        observer.observe(gl.canvas, { box: "content-box" })
    }

    public setPainters(painters: Painter[]) {
        this.painters = painters
    }

    public paint = (time: number) => {
        const { gl } = this
        const { canvas } = gl
        const width = this.displayWidth
        const height = this.displayHeight
        if (
            width !== this.lastCanvasWidth ||
            height !== this.lastCanvasheight
        ) {
            this.lastCanvasWidth = width
            this.lastCanvasheight = height
            canvas.width = width
            canvas.height = height
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
}
