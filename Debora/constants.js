const GAME_CLOCK = 1000; // interval between falling blocks
const BLOCK_SIDE_LENGTH = 30;
const ROWS = 22;
const COLS = 11;
const SCORE_WORTH = 10; // score will be counted by 10

const SHAPES = [
  [],
  [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], // line tetromino
  [[2,0,0],[2,2,2],[0,0,0]], // L left tetromino
  [[0,0,3],[3,3,3],[0,0,0]], // T right tetromino
  [[4,4],[4,4]], // O tetromino
  [[0,5,5],[5,5,0],[0,0,0]], // S tetromino
  [[0,6,0],[6,6,6],[0,0,0]], // T tetromino
  [[7,7,0],[0,7,7],[0,0,0]], // Z tetromnino
];

const COLORS = [
  '#333333', // canvas' amd tetromins's colors
  '#D962C5', 
  '#1DA1F2',
  '#4BA672',
  '#FFEC5C',
  '#F36C4E',
  '#9C99F2',
  '#BD2A2E',
];