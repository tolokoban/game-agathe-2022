import { Assets } from "./assets"
import Scene from "./webgl/scene"
import WallPainter from "./painters/wall"
import BackgroundPainter from "./painters/background"
import { assertImage } from "./validator"
import Runtime from "./runtime"

export function startApplication(canvas: HTMLCanvasElement, assets: Assets) {
    assertAssets(assets)
    const scene = new Scene(canvas)
    const runtime = new Runtime(scene.gl, assets.spritesTexture)
    scene.setPainters([
        new BackgroundPainter(scene.gl, assets.floorTexture),
        new WallPainter(scene.gl, assets.wallTexture),
        runtime
    ])
    scene.play()
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
