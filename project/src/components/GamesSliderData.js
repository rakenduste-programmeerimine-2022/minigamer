import MineSweeperimage from "../Images/minesweeper.jpg";
import Sudokuimage from "../Images/Sudoku.png";
import Nonogrammimage from "../Images/nongramm.jpg";

import MineSweeperThumb from "../Images/minesweeper.jpg";
import SudokuThumb from "../Images/Sudoku.png";
import NonogrammThumb from "../Images/nongramm.jpg";

export const GamesSliderData = [
  {
    link: "/games/Minesweeper",
    name: "Minesweeper",
    image: MineSweeperimage,
    desc: "Minesweeper is a logic puzzle video game genre generally played on personal computers. The game features a grid of clickable squares, with hidden 'mines' scattered throughout the board. The objective is to clear the board without detonating any mines, with help from clues about the number of neighboring mines in each field",
    instructions:
      "To win a round of Minesweeper, you must click on the board every square that doesn't have a mine under it. Once you've done so, the game will be over. If you accidentally click a square that has a mine beneath it, the game will be over. You'll have the option of starting a new game or redoing the one you just played.",
    videoTutorial: "",
    thumbnail: MineSweeperThumb,
    nr: 0,
  },
  {
    link: "/games/Sudoku",
    name: "Sudoku",
    image: Sudokuimage,
    desc: "Sudoku originally called Number Place)[1] is a logic-based,[2][3] combinatorial[4] number-placement puzzle. In classic Sudoku, the objective is to fill a 9 × 9 grid with digits so that each column, each row, and each of the nine 3 × 3 subgrids that compose the grid (also called boxes, blocks, or regions) contain all of the.",
    instructions:
      "Sudoku is played on a grid of 9 x 9 spaces. Within the rows and columns are 9 “squares” (made up of 3 x 3 spaces). Each row, column and square (9 spaces each) needs to be filled out with the numbers 1-9, without repeating any numbers within the row, column or square.",
    videoTutorial: "",
    thumbnail: SudokuThumb,
    nr: 1,
  },
  {
    link: "/games/Nonogramm",
    name: "Nonogramm",
    image: Nonogrammimage,
    desc: "Nonograms, also known as Hanjie, Paint by Numbers,Picross, Griddlers, and Pic-a-Pix, and by various other names, are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden pixel art-like picture. In this puzzle type, the numbers are a form .",
    instructions:
      "Nonograms are deceptively simple logic puzzles: You use digits to create a pattern of filled-in squares in the empty grid provided. Each number on the lines outside the grid represents a block of squares to be blacked out in that row or column (see 1 Across)",
    videoTutorial: "https://www.youtube.com/watch?v=zisu0Qf4TAI",
    thumbnail: NonogrammThumb,
    nr: 2,
  },
];
