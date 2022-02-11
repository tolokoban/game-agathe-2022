export function makeBounceAlpha(height: number, duration: number) {
    if (duration <= 0) return () => 0

    const a = -4 * height / (duration * duration)
    const b = -a * duration
    return (time: number) => {
        if (time < 0 || time > duration) return 0

        return a * time * time + b * time
    }
}