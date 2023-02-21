class Piece { // defining a class for rendering a Tetris piece on a canvas context
  constructor(shape, ctx) {
      this.shape = shape 
      this.ctx = ctx 
      this.y = 0 
      this.x = Math.floor(COLS / 2) // setting 'x' to the center of the game board
  }

  renderPiece() {
      this.shape.map((row, i) => { // function to loop through the rows and columns of the matrix
          row.map((cell, j) => {
              if (cell > 0) {
                  this.ctx.fillStyle = COLORS[cell] 
                  this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
              }
          })
      })
  }
}
