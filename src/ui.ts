export function printScore(score: number) {
    const elem = getElem("score-value")
    elem.textContent = `${score}`
}

export function printLives(score: number) {
    const elem = getElem("lives-value")
    elem.textContent = `${score}`
}

export function printHighscore(highscore: number = -1) {
    const lasthighscore = parseInt(
        window.localStorage.getItem("highscore") ?? "0"
    )
    if (highscore < 0) {
        highscore = lasthighscore
    }
    const elem = getElem("highscore")
    elem.textContent = `${highscore}`
    if (highscore > lasthighscore) {
        window.localStorage.setItem("highscore", `${highscore}`)
    }
    printScore(highscore)
}

let timeoutId = 0

export function printWarning(message: string, duration = 800) {
    const elem = getElem("message-warning")
    elem.classList.remove("hide")
    elem.textContent = message
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
        console.log("HIDE")
        elem.classList.add("hide")
    }, duration)
}

export function hideWelcome() {
    const elem = getElem("welcome")
    elem.classList.add("hide")
}

function getElem(id: string): HTMLElement {
    const elem = document.getElementById(id)
    if (!elem) throw Error(`No HTML element with ID "${id}"!`)

    return elem
}
