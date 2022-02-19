// todo: add cross-hair
// todo: continuous reaction speed reading
// todo: better font
// todo: average reaction speed
// todo: reaction speed graph
// todo: put mouse over to restart
// todo: click order
// todo: sound effect
// todo: X if miss
// todo: settings
// todo: remaining clickers

const gameArea = document.getElementsByClassName("gameArea")[0]
const primer = document.getElementById("primer")
const timerText = document.getElementById("timer")

let clickerSize = 1.3
let initClickerCount = 10
let clickerCount = initClickerCount
let timer, startTime, clickable

primer.addEventListener("mousedown", () => {prime()})
document.addEventListener("keydown", (event) => {
    if ("zq".includes(event.key.toLowerCase())) {
        removeClicker()
    }

    if (event.key.toLowerCase() === "a") {
        // todo: pause
    }
    else if (event.key.toLowerCase() === "q") {
        // todo: end measurement
    }
})

function prime() {
    primer.style.display = "none"
    clearInterval(timer)
    clearClicker()
    initializeTimer()
    addClicker()
}

function addClicker() {
    let newClicker = document.createElement("div")
    newClicker.addEventListener("mousedown", removeClicker, {once: true})
    newClicker.addEventListener("mouseenter", () => {clickable = newClicker})
    newClicker.addEventListener("mouseleave", clearClickable)

    newClicker.classList.add("clicker")

    newClicker.style.width = `${clickerSize}in`
    newClicker.style.height = `${clickerSize}in`

    let x = Math.random() * 100, y = Math.random() * 100
    // todo: always make clicker appear in the screen
    newClicker.style.top = `${x}%`
    newClicker.style.left = `${y}%`

    gameArea.appendChild(newClicker)
}

function removeClicker() {
    if (clickable === undefined) return
    clickerCount -= 1

    if (clickerCount > 0) {
        addClicker()
    }
    else if (clickerCount === 0) {
        primer.style.display = "block"
        clearInterval(timer)
        clearClicker()
        clickerCount = initClickerCount
        clearClickable()
        return
    }
    clickable.remove()
    clearClickable()
}

function clearClicker() {
    gameArea.textContent = "";
    clearClickable()
}

function clearClickable() {
    clickable = undefined
}

function initializeTimer() {
    startTime = Date.now()
    timer = setInterval(() => {
        timerText.innerHTML = ((Date.now() - startTime) / 1000).toFixed(2)
    }, 10)
}
