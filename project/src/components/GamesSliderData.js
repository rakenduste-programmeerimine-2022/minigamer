import MinesweeperImage from "../Images/minesweeper.jpg";
import SudokuImage from "../Images/sudoku.png";
import NonogramImage from "../Images/nonogram.jpg";

export const GamesSliderData = [
    {
        link: "/games/Minesweeper",
        name: "Minesweeper",
        image: MinesweeperImage,
        desc: "Minesweeper is a logic puzzle video game genre generally played on personal computers. The game features a grid of clickable squares, with hidden 'mines' scattered throughout the board. The objective is to clear the board without detonating any mines, with help from clues about the number of neighboring mines in each field",
    },
    {
        link: "/games/Flood",
        name: "Flood",
        image: SudokuImage,
        desc: "Flood is a color-based puzzle game where you have to make the entire grid a single color and do it in the least amount of clicks. Clicking on a cell changes the top-left cell and its similarly-colored neighbors to that color, thus increasing the surface area the clicked cell's color has.",
    },
    {
        link: "/games/Nonogram",
        name: "Nonogram",
        image: NonogramImage,
        desc: "Nonograms, also known as Hanjie, Paint by Numbers,Picross, Griddlers, and Pic-a-Pix, and by various other names, are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden pixel art-like picture. In this puzzle type, the numbers are a form .",
    },
];
