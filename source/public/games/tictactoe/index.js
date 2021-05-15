const X_CLASS = "x"
const O_CLASS = "o"

const WINNING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winnerMessage = document.querySelector("[data-message]")
const winner = document.getElementById("winner")
const restartButton = document.getElementById("restart")

let oTurn = false;

restartButton.addEventListener("click", gameStart)

function gameStart() {
    function clickHandler(event) {
        console.log(full())
        const currentClass = oTurn ? O_CLASS : X_CLASS
        event.target.classList.add(currentClass)  // add O or X to the grid

        if (checkWin(currentClass)) {
            gameOver(false)
        } else if (full()) {
            gameOver(true)
        }
        oTurn = !oTurn  // change tern
        updateHover()
    }

    winner.classList.remove("show")
    cellElements.forEach(cell => {
        cell.classList.remove("o")
        cell.classList.remove("x")
    })

    cellElements.forEach(cell => {
        cell.addEventListener("click", clickHandler, {once: true})
    })

    updateHover()
}

function gameOver(draw) {
    if (draw) {
        // show draw message
    }
    else {
        winnerMessage.innerText = `${oTurn ? "O" : "X"} won!!`
    }
    winner.classList.add("show")
}

function updateHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    if (oTurn) {
        board.classList.add(O_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_PATTERN.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function full() {
    //todo: add when the game is a draw
    return false
}


gameStart()
