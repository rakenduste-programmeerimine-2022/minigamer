import MinesweeperImage from "../Images/minesweeper.jpg";
import NonogramImage from "../Images/nonogram.jpg";
import FloodImage from "../Images/flood.jpg";
import DailyImage from "../Images/daily.png";

import MinesweeperThumb from "../Images/minesweeper_thumb.jpg";
import NonogramThumb from "../Images/nonogram_thumb.jpg";
import FloodThumb from "../Images/flood_thumb.png";
import DailyThumb from "../Images/daily_thumb.png";

export const GamesSliderData = [
    {
        link: "/games/Nonogram",
        name: "Nonogram",
        image: NonogramImage,
        desc: "Nonograms, also known as Hanjie, Paint by Numbers,Picross, Griddlers, and Pic-a-Pix, and by various other names, are picture logic puzzles in which cells in a grid must be colored or left blank according to numbers at the side of the grid to reveal a hidden pixel art-like picture. In this puzzle type, the numbers are a form .",
        instructions:
            "Nonograms are deceptively simple logic puzzles: You use digits to create a pattern of filled-in squares in the empty grid provided. Each number on the lines outside the grid represents a block of squares to be blacked out in that row or column (see 1 Across)",
        videoTutorial: "https://www.youtube.com/watch?v=zisu0Qf4TAI",
        thumbnail: NonogramThumb,
    },
    {
        link: "/games/Minesweeper",
        name: "Minesweeper",
        image: MinesweeperImage,
        desc: "Minesweeper is a logic puzzle video game genre generally played on personal computers. The game features a grid of clickable squares, with hidden 'mines' scattered throughout the board. The objective is to clear the board without detonating any mines, with help from clues about the number of neighboring mines in each field",
        instructions:
            "To win a round of Minesweeper, you must click on the board every square that doesn't have a mine under it. Once you've done so, the game will be over. If you accidentally click a square that has a mine beneath it, the game will be over. You'll have the option of starting a new game or redoing the one you just played.",
        videoTutorial: "",
        thumbnail: MinesweeperThumb,
    },
    {
        link: "/games/Flood",
        name: "Flood",
        image: FloodImage,
        desc: "Flood is a color-based puzzle game where you have to make the entire grid a single color and do it in the least amount of clicks. Clicking on a cell changes the top-left cell and its similarly-colored neighbors to that color, thus increasing the surface area the clicked cell's color has.",
        instructions:
            "To play Flood, click any cell on the grid. The top-left cell and its same-color neighbors will change to the clicked cell's color, expanding the color's surface area. To win, the entire grid must contain a single color.",
        videoTutorial: "",
        thumbnail: FloodThumb,
    },
    {
        link: "/games/Daily",
        name: "Daily",
        image: DailyImage,
        desc: "Every day, there's a game that is the same for each user. Compete and show your mastery of Minigamer's array of games by becoming the best player of the day!",
        instructions:
            "You can find the instructions of the daily challenge game on its corresponding game page.",
        videoTutorial: undefined,
        thumbnail: DailyThumb,
    },
];
