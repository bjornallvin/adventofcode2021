import * as fs from "fs";
import { cachedDataVersionTag } from "v8";

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        var array = data.toString().split("\r\n");
        resolve(array);
      }
    });
  });
};
const log = (text, args) => {
  if (debug) {
    if (args) console.log(text, args);
    else console.log(text);
  }
};

const parseBoardRow = (row) => {
  log(row);
  row = row.trim();
  log(row);
  row = row.replace(/  /g, " ");
  log(row);
  return row.split(" ").map((str) => ({ value: parseInt(str), marked: false }));
};

const parseInput = (input) => {
  var numbers = input[0].split(",").map((str) => parseInt(str));
  var boards = [];

  var boardFirstRow = 2;
  while (boardFirstRow < input.length) {
    var board = [
      parseBoardRow(input[boardFirstRow]),
      parseBoardRow(input[boardFirstRow + 1]),
      parseBoardRow(input[boardFirstRow + 2]),
      parseBoardRow(input[boardFirstRow + 3]),
      parseBoardRow(input[boardFirstRow + 4]),
    ];
    boards.push(board);
    boardFirstRow += 6;
  }

  return { numbers, boards };
};

const processBoard = (board, number) => {
  var hit = false;
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      if (board[row][col].value === number) {
        board[row][col].marked = true;
        hit = true;
      }
    }
  }
  return hit;
};

const getBoardColumn = (board, col) => {
  var col = [
    board[0][col],
    board[1][col],
    board[2][col],
    board[3][col],
    board[4][col],
  ];
  return col;
};

const isBoardBingo = (board) => {
  for (var row = 0; row < 5; row++) {
    var bingo = board[row].reduce((acc, cell) => {
      return acc && cell.marked;
    }, true);
    if (bingo) return true;
  }

  for (var col = 0; col < 5; col++) {
    var bingo = getBoardColumn(board, col).reduce((acc, cell) => {
      return acc && cell.marked;
    }, true);
    if (bingo) return true;
  }

  return false;
};

const printBoard = (board) => {
  log("Printing board");
  log(board);
  for (var row = 0; row < 5; row++) {
    var str = board[row].reduce((acc, cell) => {
      return acc + " " + cell.value + (cell.marked ? "(x) " : " ");
    }, "");
    log(str);
  }
};

const getBoardScore = (board) => {
  var score = 0;
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      if (!board[row][col].marked) {
        score += board[row][col].value;
      }
    }
  }
  return score;
};

//------------------------------------------------------------------------------
var debug = true;

var input = await readFile("./days/4/part1/real_data.txt");

log(input);
const { numbers, boards } = parseInput(input);
log("Numbers: ", numbers);
log("Boards", boards);

var bingo = false;
for (var number of numbers) {
  log(number);
  for (var board of boards) {
    //log("Board:", board);
    var hit = processBoard(board, number);
    if (hit) {
      log("Hit on board", board);

      if (isBoardBingo(board)) {
        bingo = true;
        log("BINGO", printBoard(board));
        log("Board value:", getBoardScore(board));
        log("Bingo score:", number * getBoardScore(board));
        break;
      }
    }
  }
  if (bingo) break;
}
