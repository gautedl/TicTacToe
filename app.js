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
  // Populates the Gameboard with the correct values
  const populateGameboard = (div, x, y, value) => {
    div.textContent = value;
    Gameboard.setValue(x, y, value);
  };

  return { populateGameboard };
})();

const gameLogic = (() => {
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

        console.log(Gameboard.getGameboard());
      });
    });

  // Logic for switching turns
  const playerTurn = () => {
    if (player2Turn) {
      gameValue = player1.getValue();
      player2Turn = !player2Turn;
    } else {
      gameValue = player2.getValue();
      player2Turn = !player2Turn;
    }
  };

  return { selectTile };
})();

gameLogic.selectTile();
