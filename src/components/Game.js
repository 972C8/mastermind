import React, {useEffect, useState} from 'react';
import ColorPicker from "./ColorPicker";
import Evaluation from "./Evaluation";
import '../styles/Game.css';

function Game() {
    const maxRows = 6;
    const colors = ["red", "blue", "yellow", "green", "orange", "purple", "lime", "pink"];
    const defaultColor = "white";

    const [board, setBoard] = useState(null);
    const [gameCode, setGameCode] = useState(null);
    const [turn, setTurn] = useState(0);
    const [selectedColor, setSelectedColor] = useState("red");
    const [evaluation, setEvaluation] = useState(Array(maxRows).fill([]))
    const [message, setMessage] = useState(null);

    //Execute once on first render
    useEffect(() => {
        createNewGame();
        //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once#53121021
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    //Create a new game with new board and game code
    const createNewGame = () => {
        //Initialize new game
        setBoard(createNewBoard(defaultColor))
        setGameCode(createNewGameCode(colors))
        setTurn(0)
        setEvaluation(Array(maxRows).fill([]))

        setMessage("New game code generated. Have fun solving!")
    };

    //Creates a new unique code of 4 colors from all existing colors
    const createNewGameCode = (colors) => {
        // Make a copy of the array
        let tmp = colors.slice(colors);
        let code = [];

        for (let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * tmp.length);
            let removed = tmp.splice(index, 1);
            // Since we are only removing one element
            code.push(removed[0]);
        }
        return code;
    }

    //Handle game won screen
    const handleGameWon = () => {
        //Set turn to maxRows to disable all rows
        setTurn(maxRows);

        setMessage("Game won! You guessed the code correctly.")
    }

    //Handle game over screen
    const handleGameOver = () => {
        //Set turn to maxRows to disable all rows
        setTurn(maxRows)

        setMessage("Game over! All available turns were consumed. The code was: " + gameCode.join(", "))
    }

    //Show solution of game code
    const showSolution = () => {
        const code = gameCode ? gameCode.join(', ') : "Create a new game first!";
        setMessage("The solution is: " + code);
    }

    //Show info on how to play
    const showHowToPlay = () => {
        const msg = "https://en.wikipedia.org/wiki/Mastermind_(board_game)";
        setMessage(msg);
    }

    //Update the evaluation state which re-renders the evaluation component
    const updateEvaluation = (currentRow) => {
        //the code guess of the current row
        const guess = board ? board[currentRow] : [];

        //Update evaluation with evaluated guess of the code
        setEvaluation((evaluation) => {
            //Update the current row with the new evaluation
            evaluation[currentRow] = evaluateGuess(guess);

            return evaluation;
        })
    }

    //Evaluate the guessed code
    //Create evaluation of red and white pins
    const evaluateGuess = (guess) => {
        let evaluation = [];

        //All colors of the row must be guessed
        if (guess.includes(defaultColor)) {
            setMessage("Select a color for all pegs!")
            return [];
        }

        //Create evaluation array consisting of red and white pins
        //White pin = color is correct
        //Red pin = color and position is correct
        guess.forEach((peg, key) => {

                //Correct guess. All pins are red
                if (gameCode.join(',') === guess.join(',')) {
                    evaluation.push("red");
                } else {
                    //Add red/white pins based on evaluation
                    if (gameCode.includes(peg)) {
                        //peg color and position match -> red pin
                        if (gameCode.indexOf(peg) === key) {
                            evaluation.push("red");
                        } else {
                            //only peg color matches
                            evaluation.push("white");
                        }
                    }
                }
            }
        )

        //Handle game won
        if (gameCode.join(',') === guess.join(',')) {
            handleGameWon();
            return evaluation;
        }

        //Sort the pins by color
        evaluation.sort();

        //Check if turns are left and increment turn by 1
        const newTurn = turn + 1;
        if (newTurn >= maxRows) {
            handleGameOver();
        } else {
            //Increment turn by 1. Check available turns right after
            setTurn(newTurn)
        }
        return evaluation;
    }

    //Create new board with default color pegs
    const createNewBoard = (defaultColor) => {
        const board = [];

        for (let i = 0; i < maxRows; i++) {
            var row = [defaultColor, defaultColor, defaultColor, defaultColor]
            board.push(row);
        }
        return board;
    }

    //Update board with the new color
    //If the color already exists in the row. Swap the positions of the two colors for user convenience.
    const updateBoardColor = (rowNum, pegPos) => {
        //Set updated board as new board state
        setBoard((board) => {
            //Update board with new color for relevant peg of row
            const newBoard = board.slice();

            //colorPos represents where the new color was used in the row array (0,1,2,3)
            //Note: colorPos is -1 if the color was not used yet
            const currentRow = newBoard[rowNum];
            const colorPos = currentRow.indexOf(selectedColor);

            //Swap colors of the two pegs
            if (colorPos >= 0 && colorPos !== pegPos) {
                //Get color of selected peg
                const selectedPegColor = currentRow[pegPos];

                //Update selected peg with new color
                currentRow[pegPos] = selectedColor;

                //Update old peg with color of selected peg
                currentRow[colorPos] = selectedPegColor;
            } else {
                //Update color at given board position
                currentRow[pegPos] = selectedColor;
            }

            return newBoard;
        })
    }

    //Update the currently selected color
    const updateSelectedColor = (color) => {
        setSelectedColor(color);
    }

    //Return true if row should be disabled
    //All rows except the current turn's should be disabled
    const isRowDisabled = (rowNum) => {
        return turn !== rowNum
    }

    //Create amount of rows corresponding to maxRows for the board
    const renderRow = (rowNum) => {
        const row = [];

        //board[i] doesn't exist before board is initialized
        const boardRow = board ? board[rowNum] : [];

        //Create 4 pegs per row
        const pegs = [];
        for (let pegPos = 0; pegPos < 4; pegPos++) {

            //The color of each peg as stored in state board
            const color = boardRow[pegPos];

            //Button representing a peg. onClick called when a peg changes its color
            pegs.push(<button key={pegPos} value={color} className={"btn-peg btn-" + color}
                              onClick={() => updateBoardColor(rowNum, pegPos)}/>)
        }
        row.push(pegs);

        //Create additional button and evaluation
        row.push(<button key={"btn" + row} className={"btn-confirm"}
                         onClick={() => updateEvaluation(rowNum)}>Confirm</button>)
        row.push(<Evaluation key={"key" + row} keyPegs={evaluation[rowNum]}/>)

        return row;
    }

    //Render a board consisting of rows
    const renderBoard = () => {
        const board = [];

        //Render the rows and push them into the board
        for (let rowNum = 0; rowNum < maxRows; rowNum++) {

            //Indicate whether the row should be disabled through css
            const isDisabled = (isRowDisabled(rowNum) ? " disabled" : "");

            //Push the rendered row into the board
            const row = <div key={rowNum} className={"row" + isDisabled}>{renderRow(rowNum)}</div>;
            board.push(row);
        }
        return board;
    }

    return (
        <div className="App">
            <h1>MasterMind</h1>
            <div className={"top"}>
                <button onClick={createNewGame}>Create New Game</button>
                <button onClick={showSolution}>Show Solution</button>
                <button onClick={showHowToPlay}>How to play</button>
            </div>
            <div className={"messages"}>
                <h3>{message}</h3>
            </div>
            <div className={"center"}>
                <ColorPicker colors={colors} updateSelectedColor={updateSelectedColor}/>
                <div className={"board"}>
                    {renderBoard()}
                </div>
            </div>
        </div>
    );
}

export default Game;