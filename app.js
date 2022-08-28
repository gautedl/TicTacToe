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
  const winningScreen = document.querySelector(".winning-screen-container");
  const winningName = document.querySelector(".winning-name");
  const winningValue = document.querySelector(".winning-value");
  const winnerTitle = document.querySelector(".winner-title");
  const gameScreen = document.querySelector(".game-screen");
  const rematchBtn = document.querySelector(".rematch");
  const newGameBtn = document.querySelector(".new-game");
  const tiles = document.querySelectorAll(".tile");
  const startScreen = document.querySelector(".start-screen");
  const inputNames = document.querySelectorAll(".inputs");

  // cleans the gameboard
  const cleanUpBoard = () => {
    tiles.forEach((item) => {
      item.textContent = "";
      item.classList.add("tile-hover");
      item.classList.remove("X");
      item.classList.remove("O");
    });
    Gameboard.resetGameboard();
  };

  // Starts a rematch between the two players
  const rematch = () => {
    rematchBtn.addEventListener("click", () => {
      cleanUpBoard();
      winningScreen.classList.add("unactive");
      gameScreen.classList.remove("unactive");
      gameLogic.startNewGame();
    });
  };

  // Starts a new game with new players
  const newGame = () => {
    newGameBtn.addEventListener("click", () => {
      cleanUpBoard();
      inputNames.forEach((item) => (item.value = ""));

      winningScreen.classList.add("unactive");
      startScreen.classList.remove("unactive");
      gameLogic.startNewGame();
    });
  };

  // Populates the winning screen with the players name and value
  const showWinningScreen = (player) => {
    gameScreen.classList.add("unactive");
    winningScreen.classList.remove("unactive");
    winningScreen.classList.add("blur");
    winningName.textContent = player.getName();
    winningName.classList.add(`${player.getValue()}`);
    winningValue.textContent = player.getValue();
    winningValue.classList.add(`${player.getValue()}`);
    winningValue.classList.add(`win`);
  };

  // Populates the winning screen if it's a tie
  const showTieScreen = () => {
    gameScreen.classList.add("unactive");
    winningScreen.classList.remove("unactive");
    winningName.textContent = "Tie";
    winningName.classList.add("winner-title-tie");
    winningValue.textContent = ":(";
    winningValue.classList.add(`winner-title-tie`);
    winnerTitle.textContent = "";
  };

  // Populates the Gameboard with the correct values
  const populateGameboard = (div, x, y, value) => {
    div.textContent = value;
    div.classList.add(`${value}`);
    div.classList.remove("tile-hover");
    Gameboard.setValue(x, y, value);
  };

  return {
    populateGameboard,
    showWinningScreen,
    showTieScreen,
    rematch,
    newGame,
  };
})();

const gameLogic = (() => {
  const playerP = document.querySelector(".player-turn");
  const valueP = document.querySelector(".player-value");
  const playerT = document.querySelector(".players-turn");

  let player1 = Player("", "");
  let player2 = Player("", "");

  Gameboard.getGameboard();

  let gameValue = "X"; // value X will always start
  let player2Turn = false;
  let dataX;
  let dataY;
  let numberOfRounds = 0;

  const players = document.querySelectorAll(".inputs");
  const submitBtn = document.querySelector(".submitbtn");
  const startScreen = document.querySelector(".start-screen");
  const gameScreen = document.querySelector(".game-screen");

  // helper function for fetching the players name and puts them in an array
  const getPlayerNames = () => {
    const nameArr = [];
    players.forEach((name) => {
      nameArr.push(name.value);
    });
    player1 = Player(nameArr[0], "X");
    player2 = Player(nameArr[1], "O");
  };

  // Gets the players names from the inputs on button click
  const submitPlayerNames = () => {
    submitBtn.addEventListener("click", (e) => {
      getPlayerNames(player1, player2);
      if (player1.getName() === "" || player2.getName() === "") {
        return;
      }

      e.preventDefault();

      startScreen.classList.add("unactive");
      gameScreen.classList.remove("unactive");
      playerP.textContent = `${player1.getName()}'s turn:`;
      valueP.textContent = player1.getValue();
      playerT.classList.add("player-1");
    });
  };

  // Resets correct values on starting new game or rematch
  const startNewGame = () => {
    gameValue = "X";
    player2Turn = false;
    playerP.textContent = `${player1.getName()}'s turn:`;
    valueP.textContent = player1.getValue();
    playerT.classList.remove("player-2");
    playerT.classList.add("player-1");
  };

  // Places the value of the player who's turn it is in the tile.
  const selectTile = () =>
    document.querySelectorAll(".tile").forEach((item) => {
      item.addEventListener("click", function (e) {
        dataX = e.target.dataset.x; // Finds the x value
        dataY = e.target.dataset.y; // Finds the y value

        // Checks if the tile is already marked
        if (
          Gameboard.getGameboard()[dataX][dataY] === "X" ||
          Gameboard.getGameboard()[dataX][dataY] === "O"
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
      playerP.textContent = `${player1.getName()}'s turn:`;
      valueP.textContent = player1.getValue();
      playerT.classList.remove("player-2");
      playerT.classList.add("player-1");
      gameValue = player1.getValue();
      player2Turn = !player2Turn;
    } else {
      playerP.textContent = `${player2.getName()}'s turn:`;
      valueP.textContent = player2.getValue();
      playerT.classList.remove("player-1");
      playerT.classList.add("player-2");
      gameValue = player2.getValue();
      player2Turn = !player2Turn;
    }
  };

  // logic for checking for who has won or if its a tie and displays to screen
  const checkForWin = () => {
    if (numberOfRounds === 9) {
      displayController.showTieScreen();
      numberOfRounds = 0;
    }

    if (
      winLogic.checkRows() === "X" ||
      winLogic.checkColumns() === "X" ||
      winLogic.checkDiagonal() === "X"
    ) {
      displayController.showWinningScreen(player1);
      numberOfRounds = 0;
    } else if (
      winLogic.checkRows() === "O" ||
      winLogic.checkDiagonal() === "O" ||
      winLogic.checkColumns() === "O"
    ) {
      displayController.showWinningScreen(player2);
      numberOfRounds = 0;
    }
  };

  return { selectTile, submitPlayerNames, startNewGame };
})();

const winLogic = (() => {
  Gameboard.getGameboard();

  // Checks if diagonal has winning conditions
  const checkDiagonal = () => {
    const diagonal1 = [
      Gameboard.getGameboard()[0][0],
      Gameboard.getGameboard()[1][1],
      Gameboard.getGameboard()[2][2],
    ];
    const diagonal2 = [
      Gameboard.getGameboard()[0][2],
      Gameboard.getGameboard()[1][1],
      Gameboard.getGameboard()[2][0],
    ];
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
      if (Gameboard.getGameboard()[i].every((tile) => tile === "X")) {
        return "X";
      } else if (Gameboard.getGameboard()[i].every((tile) => tile === "O")) {
        return "O";
      }
    }
  };

  // Checks if columns has winning conditions by cjecking rows on a transposed gameboard
  const checkColumns = () => {
    const transposedGameboard = transpose(Gameboard.getGameboard());

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

// Functions for making the game playable
const gameController = (() => {
  gameLogic.submitPlayerNames();
  gameLogic.selectTile();
  displayController.rematch();
  displayController.newGame();
})();
