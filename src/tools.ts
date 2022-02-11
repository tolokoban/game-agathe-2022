export function rand(min: number, max: number): number {
    return min + (max - min) * Math.random()
}

export function clamp(v: number, min=0, max= 0.999999) {
    if (v < min) return min
    if (v > max) return max
    return v
}
