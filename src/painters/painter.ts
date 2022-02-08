export default abstract class Painter {
    abstract paint(time: number): void
    abstract anim(time: number): void
    abstract destroy(): void
}