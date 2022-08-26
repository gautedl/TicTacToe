const Gameboard = (() => {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
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
  const players = document.querySelectorAll(".inputs");
  const submitBtn = document.querySelector(".submitbtn");
  const startScreen = document.querySelector(".start-screen");
  const gameScreen = document.querySelector(".game-screen");
  let player1;
  let player2;

  // helper function for fetching the players name and puts them in an array
  const getPlayerNames = () => {
    const nameArr = [];
    players.forEach((name) => {
      nameArr.push(name.value);
    });
    player1 = Player(nameArr[0], "X");
    player2 = Player(nameArr[1], "O");
  };

  const submitPlayerNames = () => {
    submitBtn.addEventListener("click", (e) => {
      getPlayerNames();
      if (player1.getName() === "" || player2.getName() === "") {
        return;
      }
      e.preventDefault();

      startScreen.classList.add("unactive");
      submitBtn.classList.add("unactive");
      gameScreen.classList.remove("unactive");
    });
  };

  // Populates the Gameboard with the correct values
  const populateGameboard = (div, x, y, value) => {
    div.textContent = value;
    Gameboard.setValue(x, y, value);
  };

  return { populateGameboard, player1, player2, submitPlayerNames };
})();

const gameLogic = (() => {
  let playerP = document.querySelector(".player-turn");
  let valueP = document.querySelector(".player-value");
  const player1 = displayController.player1;
  const player2 = displayController.player2;

  const gameboard = Gameboard.getGameboard();

  let gameValue = "X"; // value X will always start
  let player2Turn = false;
  let dataX;
  let dataY;
  let numberOfRounds = 0;

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
        numberOfRounds++;

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

  // NEEDS LOGIC FOR FETCHING CORRECT PLAYER
  const checkForWin = () => {
    if (numberOfRounds === 9) {
      console.log("Tie");
    }

    if (winLogic.checkDiagonal() === "X") {
      console.log(player1.getName());
    } else if (winLogic.checkDiagonal() === "O") {
      console.log(player2.getName());
    }

    if (winLogic.checkRows() === "X") {
      console.log(player1.getName());
    } else if (winLogic.checkRows() === "O") {
      console.log(player2.getName());
    }

    if (winLogic.checkColumns() === "X") {
      console.log(player1.getName());
    } else if (winLogic.checkColumns() === "O") {
      console.log(player2.getName());
    }
  };

  return { selectTile };
})();

const winLogic = (() => {
  const gameboard = Gameboard.getGameboard();

  // Checks if diagonal has winning conditions
  const checkDiagonal = () => {
    const diagonal1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
    const diagonal2 = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];
    if (
      diagonal1.every((tile) => tile === "X") ||
      diagonal2.every((tile) => tile === "X")
    ) {
      return "X";
    } else if (
      diagonal1.every((tile) => tile === "O") ||
      diagonal2.every((tile) => tile === "O")
    ) {
      return "O";
    }
  };

  // checks if Rows has winning conditions
  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      if (gameboard[i].every((tile) => tile === "X")) {
        return "X";
      } else if (gameboard[i].every((tile) => tile === "O")) {
        return "O";
      }
    }
  };

  // Checks if columns has winning conditions by cjecking rows on a transposed gameboard
  const checkColumns = () => {
    const transposedGameboard = transpose(gameboard);

    for (let i = 0; i < 3; i++) {
      if (transposedGameboard[i].every((tile) => tile === "X")) {
        return "X";
      } else if (transposedGameboard[i].every((tile) => tile === "O")) {
        return "O";
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

const gameController = (() => {
  displayController.submitPlayerNames();
})();
