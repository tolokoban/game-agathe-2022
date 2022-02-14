export function printScore(score: number) {
    const elem = getElem("score-value")
    elem.textContent = `${score}`
}

export function printLives(score: number) {
    const elem = getElem("lives-value")
    elem.textContent = `${score}`
}

export function printWarning(message: string, duration=2000) {
    const elem = getElem("message-warning")
    elem.classList.remove("hide")
    elem.textContent = message
    window.setTimeout(()=>{
        elem.classList.add("hide")
    }, duration)
}

function getElem(id: string): HTMLElement {
    const elem = document.getElementById(id)
    if (!elem) throw Error(`No HTML element with ID "${id}"!`)

    return elem
}
