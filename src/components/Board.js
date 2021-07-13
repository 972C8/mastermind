import React from 'react';
import Row from "./Row";
import ColorPicker from "./ColorPicker";

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxRows: 6,
            turn: 0,
            colors: ["red", "blue", "yellow", "green", "orange"],
            currentColor: "white",
            board: this.initializeBoard(6)
        };

        this.setSelectedColor = this.setSelectedColor.bind(this);
        this.updateColor = this.updateColor.bind(this);
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
            //disable all rows except for the current turn's row
            board.push(<Row key={i} isDisabled={this.isDisabled(i)} updateColor={this.updateColor}
                            currentColor={this.state.currentColor} rowPegs={this.state.board[i]} row={i}/>)
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
            const selectedPegColor = board[rowPos][pegPos];

            //Update selected peg with new color
            board[rowPos][pegPos] = newPegColor;

            //Update old peg with color of selected peg
            board[rowPos][colorPos] = selectedPegColor;
        } else {
            //Update color at given board position
            board[rowPos][pegPos] = newPegColor;
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