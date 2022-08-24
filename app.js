const Gameboard = (() => {
  let gameboard = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  const getGameboard = () => gameboard;

  const resetGameboard = () =>
    (gameboard = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ]);

  //Sets the value of the field in the gameboard
  const setValue = (i, j, val) => {
    gameboard[i][j] = val;
  };

  return { getGameboard, resetGameboard, setValue };
})();

const Player = (name, value) => {
  const getName = () => name;
  const getValue = () => value;

  return { getName, getValue };
};

const displayController = (() => {})();

const gameLogic = () => {};

const player1 = Player("Frank", "x");
const player2 = Player("Trym", "o");

console.log(Gameboard.setValue(1, 1, player1.getValue()));
console.log(Gameboard.getGameboard());
