import { Assets } from "./assets"
import Scene from "./webgl/scene"
import WallPainter from "./painters/wall"
import BackgroundPainter from "./painters/background"
import { assertImage } from "./validator"
import Runtime from "./runtime/runtime"

export function startApplication(canvas: HTMLCanvasElement, assets: Assets) {
    window.requestAnimationFrame((time) => {
        assertAssets(assets)
        const scene = new Scene(canvas, {
            alpha: false,
            depth: false,
            stencil: false,
            antialias: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: true,
        })
        const runtime = new Runtime(time, scene.gl, assets.spritesTexture)
        runtime.eventGameOver.add(({success})=> {
            scene.stop()
        })
        scene.setPainters([
            new BackgroundPainter(scene.gl, assets.floorTexture),
            new WallPainter(scene.gl, assets.wallTexture),
            runtime,
        ])
        scene.play()
    })
}

function assertAssets(data: { [key: string]: unknown }): asserts data is {
    floorTexture: HTMLImageElement
    wallTexture: HTMLImageElement
    spritesTexture: HTMLImageElement
} {
    assertImage(data.floorTexture, "data.floorTexture")
    assertImage(data.wallTexture, "data.wallTexture")
    assertImage(data.spritesTexture, "data.spritesTexture")
}
