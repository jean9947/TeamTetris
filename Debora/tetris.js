
let canvas = document.getElementById("gameboard") // obtaining references to the Canvas element and the scoreboard element using their respective IDs
let scoreboard = document.getElementById("scoreboard") 
let ctx = canvas.getContext("2d") // 2D rendering context of the canvas and scales it by a specified block side length
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH) 
let model = new GameModel(ctx) // creating a new GameModel object that takes the context as a parameter

let score = 0 

setInterval(() => { // setting up to repeatedly call a newGameState function every GAME_CLOCK milliseconds
    newGameState()
}, GAME_CLOCK); 

let newGameState = () => { //checking if there is a falling piece in the game model
    scoreCheck() 
    if (model.fallingPiece === null) {
        const rand = Math.round(Math.random() * 6) + 1
        const newPiece = new Piece(SHAPES[rand], ctx) 
        model.fallingPiece = newPiece 
        model.moveDown()
    } 
    else {
        model.moveDown()
    }
}

const scoreCheck = () => { //checking if there are any filled rows in the game grid
       const filledRow = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (filledRow(model.grid[i])) {
            score += SCORE_WORTH 
            model.grid.splice(i, 1) 
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }
    scoreboard.innerHTML = "Score: " + String(score) // updating scoreboard element's innerHTML with the new score
}

document.addEventListener("keydown", (e) => {
    e.preventDefault() // preventing the default behavior of chosen keys for game movement 
    switch(e.key) {
        case "ArrowUp":
            model.rotate() 
            break 
        case "ArrowRight":
            model.move(true) 
            break 
        case "ArrowDown": 
            model.moveDown() 
            break 
        case "ArrowLeft":
            model.move(false) 
            break
    }
})