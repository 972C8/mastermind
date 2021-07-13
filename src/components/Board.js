import React from 'react';
import Row from "./Row";
import ColorPicker from "./ColorPicker";

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxRows: 6,
            turn: 0,
            colors: ["red", "blue", "yellow", "green", "orange", "purple", "lime", "pink"],
            currentColor: "red",
            board: null,
            gameCode: null
        };

        this.setSelectedColor = this.setSelectedColor.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.evaluateCodeGuess = this.evaluateCodeGuess.bind(this);
    }

    //Initialize game data
    componentDidMount() {
        this.createNewGame();
    }

    //Create a new game with new board and game code
    createNewGame() {
        const board = this.initializeBoard(this.state.maxRows);
        const code = this.createNewCode(this.state.colors);

        this.setState({
            turn: 0,
            board: board,
            gameCode: code,
        }, () => {
            console.log("New game created")
            //TODO: Remove logged solution
            console.log("Solution: " + this.state.gameCode)
        })
    }

    //Creates a new unique code of 4 colors from all existing colors
    createNewCode(colors) {
        // Make a copy of the array
        var tmp = colors.slice(colors);
        var code = [];

        for (var i = 0; i < 4; i++) {
            var index = Math.floor(Math.random() * tmp.length);
            var removed = tmp.splice(index, 1);
            // Since we are only removing one element
            code.push(removed[0]);
        }
        return code;
    }

    //Create new board with default pegs
    initializeBoard(maxRows) {
        const board = [];

        for (let i = 0; i < maxRows; i++) {
            var row = ["white", "white", "white", "white"]
            board.push(row);
        }
        return board;
    }

    //Create amount of rows corresponding to maxRows for the board
    renderRows() {
        const board = [];
        for (let i = 0; i < this.state.maxRows; i++) {
            //board[i] doesn't exist before board is initialized
            const rowPegs = this.state.board ? this.state.board[i] : [];

            //disable all rows except for the current turn's row
            const row = <Row key={i} isDisabled={this.isDisabled(i)} evaluateCodeGuess={this.evaluateCodeGuess}
                             updateColor={this.updateColor}
                             currentColor={this.state.currentColor} rowPegs={rowPegs} row={i}/>;
            board.push(row)
        }
        return board;
    }

    //Update board state with the new color peg
    //If the color already exists in the row. Swap the positions of the two colors for user convenience.
    updateColor(rowPos, pegPos, newPegColor) {
        //Update board with new color for relevant peg of row
        const board = this.state.board.slice();

        //colorPos represents where the new color was used in the row array (0,1,2,3)
        //Note: colorPos is -1 if the color was not used yet
        const currentRow = board[rowPos];
        const colorPos = currentRow.indexOf(newPegColor);

        //Swap colors of the two pegs
        if (colorPos >= 0 && colorPos !== pegPos) {
            //Get color of selected peg
            const selectedPegColor = currentRow[pegPos];

            //Update selected peg with new color
            currentRow[pegPos] = newPegColor;

            //Update old peg with color of selected peg
            currentRow[colorPos] = selectedPegColor;
        } else {
            //Update color at given board position
            currentRow[pegPos] = newPegColor;
        }

        this.setState({
            board: board
        })
    }

    //Set the currently selected color
    setSelectedColor(color) {
        this.setState({
            currentColor: color
        });
    }

    //All rows except the current turn's should be disabled
    isDisabled(rowNum) {
        //Only returns true if current turn matches the current row
        return this.state.turn !== rowNum;
    }

    //Evaluate the guessed code
    //Create evaluation of red and white pins
    evaluateCodeGuess() {
        //Current row according to user's turn
        const guess = this.state.board[this.state.turn];
        const code = this.state.gameCode;

        //Return true if guess is correct
        if (code.join(',') === guess.join(',')) {
            //Todo: return true
            console.log("success")
        }

        //Create evaluation array consisting of red and white pins
        //White pin = color is correct
        //Red pin = color and position is correct
        let evaluation = [];
        guess.forEach((peg, key) => {
            if (code.includes(peg)) {
                //peg color and position match -> red pin
                if (code.indexOf(peg) === key) {
                    evaluation.push("red");
                } else {
                    //only peg color matches
                    evaluation.push("white");
                }
            }
        })
        //Sort the pins by color
        evaluation.sort();

        //Increment turn by 1. Check available turns right after
        this.setState({turn: this.state.turn + 1}, () => {
            //Game over if all turns have been used
            if (this.state.turn >= this.state.maxRows) {
                console.log("Game over!")
                this.createNewGame()
            }
        })
        return evaluation;
    }

    render() {
        //render the board consisting of rows
        const board = this.renderRows();
        return (
            <div>
                {board}
                <ColorPicker colors={this.state.colors} onColorSelected={this.setSelectedColor}/>
            </div>
        );
    }
}

export default Board;