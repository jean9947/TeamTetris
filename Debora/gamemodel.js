
class GameModel { // drawing the game on canvas context
  constructor(ctx) { // taking the canvas context object as a parameter, and initializes the class properties ctx, fallingPiece, and grid
    this.ctx = ctx;
    this.fallingPiece = null;
    this.grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(0)); // defining the canvas grid measures
  }

  collision(x, y, candidate = null) { //checking whether a given position x and y on the game board collides with the falling piece or any fixed blocks on the game board.
    const shape = candidate || this.fallingPiece.shape; // taking the 'candidate' parameter, which is used to check for collisions with a potential next move of the falling piece
    return shape.some((row, i) =>
      row.some((cell, j) => {
        if (cell === 0) return false;
        const p = x + j;
        const q = y + i;
      
        return (
          p < 0 || p >= COLS || q >= ROWS || (q >= 0 && this.grid[q][p] > 0)
        );
      })
    );
  }

  renderGameState() { // rendering the game board using the ctx property, filling in squares with colors based on their corresponding values in the grid property.
    this.grid.forEach((row, i) =>
      row.forEach((cell, j) => {
        this.ctx.fillStyle = COLORS[cell];
        this.ctx.fillRect(j, i, 1, 1);
      })
    );

    if (this.fallingPiece) this.fallingPiece.renderPiece();
  }

  moveDown() {
    if (!this.fallingPiece) return this.renderGameState();
    if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
      const { shape, x, y } = this.fallingPiece;
      shape.forEach((row, i) =>
        row.forEach((cell, j) => {
          const p = x + j;
          const q = y + i;
          if (cell > 0 && q >= 0) this.grid[q][p] = shape[i][j];
        })
      );
      if (this.fallingPiece.y === 0) {
        alert("Game over!");
        this.grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
      }
      this.fallingPiece = null;
    } else this.fallingPiece.y += 1;
    this.renderGameState();
  }

  move(right) {
    if (!this.fallingPiece) return;
    const { x, y } = this.fallingPiece;
    if (right) {
      if (!this.collision(x + 1, y)) this.fallingPiece.x += 1;
    } else if (!this.collision(x - 1, y)) {
      this.fallingPiece.x -= 1;
    }
    this.renderGameState();
  }

  rotate() {
    if (!this.fallingPiece) return;
    const shape = this.fallingPiece.shape.map((row) => [...row]);
    for (let y = 0; y < shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]];
      }
    }
    shape.forEach((row) => row.reverse());
    if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape)) {
      this.fallingPiece.shape = shape;
    }

    this.renderGameState();
  }

  makeStartingGrid() { // returning a new two-dimensional array filled with zeros, which represents the initial state of the game board
    return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
  }
}
