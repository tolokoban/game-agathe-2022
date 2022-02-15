export function rand(min: number, max: number): number {
    return min + (max - min) * Math.random()
}

export function clamp(v: number, min=0, max= 0.999999) {
    if (v < min) return min
    if (v > max) return max
    return v
}

export function waitForKeyOrMouse(): Promise<void> {
    return new Promise(resolve => {
        const handler = (evt: KeyboardEvent | TouchEvent) => {
            evt.stopPropagation()
            evt.preventDefault()
            resolve()
            window.document.removeEventListener("keydown", handler, true)
            window.document.removeEventListener("pointerup", handler, true)
            }
        window.document.addEventListener("keydown", handler, true)
        window.document.addEventListener("pointerup", handler, true)
    })
}