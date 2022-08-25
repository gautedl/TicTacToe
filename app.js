const Gameboard = (() => {
  let gameboard = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  const getGameboard = () => gameboard;

  const resetGameboard = () =>
    (gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

  //Sets the value of the field in the gameboard
  const setValue = (x, y, val) => {
    gameboard[x][y] = val;
  };

  return { getGameboard, resetGameboard, setValue };
})();

const Player = (name, value) => {
  const getName = () => name;
  const getValue = () => value;

  return { getName, getValue };
};

const displayController = (() => {
  // Populates the Gameboard with the correct values
  const populateGameboard = (div, x, y, value) => {
    div.textContent = value;
    Gameboard.setValue(x, y, value);
  };

  return { populateGameboard };
})();

const gameLogic = (() => {
  let playerP = document.querySelector(".player-turn");
  let valueP = document.querySelector(".player-value");
  const gameboard = Gameboard.getGameboard();
  const player1 = Player("Frank", "X");
  const player2 = Player("Trym", "O");
  let gameValue = "X"; // value X will always start
  let player2Turn = false;
  let dataX;
  let dataY;

  // Places the value of the player who's turn it is in the tile.
  const selectTile = () =>
    document.querySelectorAll(".tile").forEach((item) => {
      item.addEventListener("click", function (e) {
        dataX = e.target.dataset.x; // Finds the x value
        dataY = e.target.dataset.y; // Finds the y value

        // Checks if the tile is already marked
        if (
          gameboard[dataX][dataY] === "X" ||
          gameboard[dataX][dataY] === "O"
        ) {
          return;
        } else {
          displayController.populateGameboard(item, dataX, dataY, gameValue);
          playerTurn();
        }

        checkForWin();
      });
    });

  // Logic for switching turns
  const playerTurn = () => {
    if (player2Turn) {
      playerP.textContent = `Player 1, ${player1.getName()}`;
      valueP.textContent = player1.getValue();
      gameValue = player1.getValue();
      player2Turn = !player2Turn;
    } else {
      playerP.textContent = `Player 2, ${player2.getName()}`;
      valueP.textContent = player2.getValue();
      gameValue = player2.getValue();
      player2Turn = !player2Turn;
    }
  };

  const checkForWin = () => {
    winLogic.checkDiagonal();
    winLogic.checkRows();
    winLogic.checkColumns();
  };

  return { selectTile };
})();

const winLogic = (() => {
  const gameboard = Gameboard.getGameboard();
  const player1 = Player("Frank", "X");
  const player2 = Player("Trym", "O");

  // Checks if diagonal has winning conditions
  const checkDiagonal = () => {
    const diagonal1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
    const diagonal2 = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];
    if (
      diagonal1.every((tile) => tile === "X") ||
      diagonal2.every((tile) => tile === "X")
    ) {
      return player1.getName();
    } else if (
      diagonal1.every((tile) => tile === "O") ||
      diagonal2.every((tile) => tile === "O")
    ) {
      return player2.getName();
    }
  };

  // checks if Rows has winning conditions
  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      if (gameboard[i].every((tile) => tile === "X")) {
        return player1.getName();
      } else if (gameboard[i].every((tile) => tile === "O")) {
        return player2.getName();
      }
    }
  };

  // Checks if columns has winning conditions by cjecking rows on a transposed gameboard
  const checkColumns = () => {
    const transposedGameboard = transpose(gameboard);

    for (let i = 0; i < 3; i++) {
      if (transposedGameboard[i].every((tile) => tile === "X")) {
        return player1.getName();
      } else if (transposedGameboard[i].every((tile) => tile === "O")) {
        return player2.getName();
      }
    }
  };

  // Transposes the gameboard
  const transpose = (a) => {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        {
          return r[c];
        }
      });
    });
  };

  return { checkDiagonal, checkRows, checkColumns };
})();

gameLogic.selectTile();
