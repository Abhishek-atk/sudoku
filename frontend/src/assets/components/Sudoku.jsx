import sudoku from "sudoku-umd";
import "../style/sudoku.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Sudoku() {
  const navigate = useNavigate()
  const squares = document.getElementsByClassName("square");
  const numbers = document.getElementsByClassName("number");
  let [mistake, setMistake] = useState(0);
  let [hint, setHint] = useState(3);
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [sudokuSolved, setSudokuSolved] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameResult, setGameResult] = useState();
  useEffect(() => {
    let board = sudoku.generate(77, false);
    let solvedString = sudoku.solve(board);
    let sudokuString = board;
    let sudokuBoard = stringToArray(sudokuString);
    let sudokuSolved = stringToArray(solvedString);
    setSudokuBoard(sudokuBoard);
    setSudokuSolved(sudokuSolved);
    setupBoard();
    fillBoard(sudokuBoard);
  }, []);

  function setupBoard() {
    for (let i = 0; i < squares.length; i++) {
      let row = 9 - Math.floor(i / 9);
      let column = (i % 9) + 1;
      let id = row * 10 + column;
      squares[i].setAttribute("id", id);
      squares[i].addEventListener("click", onSquareClick);
    }
    for (let i = 0; i < numbers.length; i++) {
      let id = i + 1;
      numbers[i].setAttribute("id", id);
    }
  }

  function fillBoard(board) {
    for (let i = 0; i < squares.length; i++) {
      let row = 9 - Math.floor(i / 9);
      let column = (i % 9) + 1;
      let id = row * 10 + column;
      let square = document.getElementById(id);
      if (board[row - 1][column - 1] != 0) {
        square.classList.add("filled");
      } else {
        square.classList.remove("filled");
      }
      square.innerHTML =
        board[row - 1][column - 1] == 0 ? "" : board[row - 1][column - 1];
    }
  }

  function stringToArray(sudokuString) {
    let board = [];
    let row = [];
    for (let i = 0; i < sudokuString.length; i++) {
      if (sudokuString[i] === ".") {
        row.push(0);
      } else {
        row.push(parseInt(sudokuString[i]));
      }
      if (row.length === 9) {
        board.push(row);
        row = [];
      }
    }
    return board;
  }

  const onSquareClick = (event) => {
    let activeSquares = document.querySelectorAll(".active");

    if (
      activeSquares.length === 1 &&
      event.target.classList.contains("active")
    ) {
      event.target.classList.toggle("active");
      return;
    }

    activeSquares.forEach((square) => square.classList.remove("active"));
    event.target.classList.add("active");
  };
  function checkCorrect(row, column, userInput) {
    if (userInput === sudokuSolved[row - 1][column - 1]) {
      return true;
    } else {
      return false;
    }
  }
  const onNumberClick = (event) => {
    let activeSquare = document.querySelector(".active");
    if (activeSquare.classList.contains("filled")) return;
    if (!activeSquare || activeSquare.classList.contains("filled")) return;
    activeSquare.innerHTML = event.target.innerHTML;
    let userInput = parseInt(event.target.innerHTML);
    let row = parseInt(activeSquare.id.charAt(0));
    let column = parseInt(activeSquare.id.charAt(1));

    let isCorrect = checkCorrect(row, column, userInput);
    console.log({ isCorrect });
    activeSquare.classList.remove(isCorrect ? "filled" : "true");
    activeSquare.classList.add(isCorrect ? "filled" : "false");

    if (isCorrect) {
      activeSquare.classList.add("true");
      let filledSquares = document.getElementsByClassName("filled");
      if (filledSquares.length === 81) {
        setGameResult("You Won");
        setModalOpen(true);
        return;
      }
    } else {
      setMistake(mistake + 1);
      if (mistake === 3) {
        setGameResult("You Lose");
        setModalOpen(true);
      }
    }
  };

  const onEraseButtonClick = () => {
    let activeSquare = document.querySelector(".active");
    if (activeSquare == null) return;
    activeSquare.classList.remove("active");
    if (activeSquare.classList.contains("filled")) return;
    activeSquare.innerHTML = "";
  };

  const onHintButtonClick = () => {
    if (hint === 0) {
      toast.error("Oops! You've used all your hints.");
      return;
    }
    let activeSquare = document.querySelector(".active");
    activeSquare.classList.remove("active");
    if (activeSquare.classList.contains("filled")) return;
    let row = parseInt(activeSquare.id.charAt(0));
    let column = parseInt(activeSquare.id.charAt(1));
    activeSquare.innerHTML = sudokuSolved[row - 1][column - 1];
    activeSquare.classList.add("filled");
    activeSquare.classList.add("true");
    let filledSquares = document.getElementsByClassName("filled");
    if (filledSquares.length === 81) {
        setGameResult("You Won");
      setModalOpen(true);
      return;
    }
    setHint(hint - 1);
  };
  function onExitButtonClick() {
    navigate('/')
  }

  return (
    <>
      {modalOpen && (
        <>
          <div className="modal-overlay">
            <Modal message={gameResult} />
          </div>
        </>
      )}

      <div className="container">
        <div id="gameBoard">
          {/* 9th Rank ---- */}
          <div className="square top left"></div>
          <div className="square top"></div>
          <div className="square top right"></div>
          <div className="square top"></div>
          <div className="square top"></div>
          <div className="square top right"></div>
          <div className="square top"></div>
          <div className="square top"></div>
          <div className="square right top"></div>
          {/* 8th Rank ---- */}
          <div className="square left"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          {/* 7th Rank ---- */}
          <div className="square left bottom"></div>
          <div className="square bottom"></div>
          <div className="square right bottom"></div>
          <div className="square bottom"></div>
          <div className="square bottom"></div>
          <div className="square right bottom"></div>
          <div className="square bottom"></div>
          <div className="square bottom"></div>
          <div className="square right bottom"></div>
          {/* 6th Rank ---- */}
          <div className="square left"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          {/* 5th Rank ---- */}
          <div className="square left"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          {/* 4th Rank ---- */}
          <div className="square left bottom"></div>
          <div className="square bottom"></div>
          <div className="square right bottom"></div>
          <div className="square bottom"></div>
          <div className="square bottom"></div>
          <div className="square right bottom"></div>
          <div className="square bottom"></div>
          <div className="square bottom"></div>
          <div className="square right bottom"></div>
          {/* 3rd Rank ---- */}
          <div className="square left"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          {/* 2nd Rank ---- */}
          <div className="square left"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square right"></div>
          {/* 1st Rank ---- */}
          <div className="square bottom left"></div>
          <div className="square bottom"></div>
          <div className="square bottom right"></div>
          <div className="square bottom"></div>
          <div className="square bottom"></div>
          <div className="square bottom right"></div>
          <div className="square bottom"></div>
          <div className="square bottom"></div>
          <div className="square bottom right"></div>
        </div>

        <div className="buttonContainer">
          <div id="info">
            <div className="erase">
              <span>Mistake:</span>
              <span id="mistakes">{mistake}/3</span>
            </div>
            <div id="timer"></div>
            <div className="hint">
              <span>Hints:</span>
              <span id="hint">{hint}/3</span>
            </div>
          </div>
          <div id="info">
            <div className="erase">
              <button
                id="eraseButton"
                title="Erase"
                onClick={onEraseButtonClick}
              >
                <i className="fas fa-eraser"></i>
              </button>
            </div>
            <div className="hint">
              <button id="hintButton" title="Hint" onClick={onHintButtonClick}>
                <i className="fas fa-regular fa-lightbulb"></i>
              </button>
            </div>
          </div>
          <div className="numbers">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                className="number"
                onClick={(event) => {
                  onNumberClick(event);
                }}
              >
                {number}
              </button>
            ))}
          </div>

          <div>
            <button id="newGameButton" onClick={onExitButtonClick}>
              Exit Game
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Sudoku;
