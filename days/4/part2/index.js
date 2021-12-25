import * as fs from "fs";

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
    var board = {
      grid: [
        parseBoardRow(input[boardFirstRow]),
        parseBoardRow(input[boardFirstRow + 1]),
        parseBoardRow(input[boardFirstRow + 2]),
        parseBoardRow(input[boardFirstRow + 3]),
        parseBoardRow(input[boardFirstRow + 4]),
      ],
      hasBingo: false,
    };
    boards.push(board);
    boardFirstRow += 6;
  }

  return { numbers, boards };
};

const processBoard = (boardGrid, number) => {
  var hit = false;
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      if (boardGrid[row][col].value === number) {
        boardGrid[row][col].marked = true;
        hit = true;
      }
    }
  }
  return hit;
};

const getBoardColumn = (boardGrid, col) => {
  var col = [
    boardGrid[0][col],
    boardGrid[1][col],
    boardGrid[2][col],
    boardGrid[3][col],
    boardGrid[4][col],
  ];
  return col;
};

const isBoardBingo = (boardGrid) => {
  for (var row = 0; row < 5; row++) {
    var bingo = boardGrid[row].reduce((acc, cell) => {
      return acc && cell.marked;
    }, true);
    if (bingo) return true;
  }

  for (var col = 0; col < 5; col++) {
    var bingo = getBoardColumn(boardGrid, col).reduce((acc, cell) => {
      return acc && cell.marked;
    }, true);
    if (bingo) return true;
  }

  return false;
};

const printBoard = (boardGrid) => {
  log("Printing boardGrid");
  log(boardGrid);
  for (var row = 0; row < 5; row++) {
    var str = boardGrid[row].reduce((acc, cell) => {
      return acc + " " + cell.value + (cell.marked ? "(x) " : " ");
    }, "");
    log(str);
  }
};

const getBoardScore = (boardGrid) => {
  var score = 0;
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
      if (!boardGrid[row][col].marked) {
        score += boardGrid[row][col].value;
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
var boardsWithBingo = 0;
for (var number of numbers) {
  log("Number:", number);

  for (var i = 0; i < boards.length; i++) {
    var board = boards[i];
    //log("Board:", board);
    if (board.hasBingo !== true) {
      var hit = processBoard(board.grid, number);
      if (hit) {
        log("Hit on board ", i);

        if (isBoardBingo(board.grid)) {
          bingo = true;
          boardsWithBingo++;
          log("BINGO", printBoard(board.grid));
          log("Board value:", getBoardScore(board.grid));
          log("Bingo score:", number * getBoardScore(board.grid));
          log("Boards wiuth Bingo:", boardsWithBingo);
          board.hasBingo = true;
        }
      }
    } else {
      log("Board " + i + " already has bingo");
    }
  }

  if (boardsWithBingo >= boards.length) {
    break;
  }
}
