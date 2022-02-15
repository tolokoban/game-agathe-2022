import { Assets } from "./assets"
import Scene from "./webgl/scene"
import WallPainter from "./painters/wall"
import SpritePainter from "./painters/sprite"
import TestPainter from "./painters/test"
import BackgroundPainter from "./painters/background"
import { assertImage } from "./validator"
import Runtime from "./runtime/runtime"
import { waitForKeyOrMouse } from "./tools"
import { hideWelcome, printHighscore, printLives } from "./ui"

export async function startApplication(
    canvas: HTMLCanvasElement,
    assets: Assets
) {
    assertAssets(assets)
    const scene = new Scene(canvas, {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: true,
        desynchronized: false,
    })
    const floorPainter = new BackgroundPainter(scene.gl, assets.floorTexture)
    const wallPainter = new WallPainter(scene.gl, assets.wallTexture)
    scene.setPainters([
        floorPainter,
        wallPainter,
        new SpritePainter(scene.gl, assets.spritesTexture, [
            {
                col: 0,
                row: 0,
                size: 0.4,
                x: 0,
                y: 0,
            },
        ]),
    ])
    scene.play()
    printHighscore()
    printLives(3)
    await waitForKeyOrMouse()
    hideWelcome()

    window.requestAnimationFrame((time) => {
        const runtime = new Runtime(time, scene.gl, assets.spritesTexture)
        runtime.eventGameOver.add(async ({ success }) => {
            scene.stop()
            await waitForKeyOrMouse()
            window.document.location.reload()
        })
        scene.setPainters([floorPainter, wallPainter, runtime])
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
