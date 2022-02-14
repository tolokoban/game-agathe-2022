import Mouse from "./agents/mouse"

export interface MouseMission {
    column: number
    // Cat line must be reached in `time` msec.
    time: number
    speed: number
    bonus: boolean
}

export interface Context {
    readonly time: number
    getNextMission(): MouseMission
    fireCongrats(): void
    fireExtraLife(): void
    fireMouseEscaped(mouse: Mouse): void
    fireMouseNearCat(mouse: Mouse): void
}