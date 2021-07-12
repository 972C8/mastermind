import React from 'react';
import Row from "./Row";
import ColorPicker from "./ColorPicker";

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxAttempts: 6,
            turn: 1,
            currentColor: "white",
        };

        this.setCurrentColor = this.setCurrentColor.bind(this);
    }

    setCurrentColor(color) {
        this.setState({
            currentColor: color
        });
    }

    //All rows except the current turn's should be disabled
    isDisabled(rowNum) {
        //Only returns true if current turn matches the current row
        return this.state.turn !== rowNum;
    }

    //Create amount of rows corresponding to maxAttempts for the board
    renderRows() {
        const board = [];
        for (let i = 1; i <= this.state.maxAttempts; i++) {
            //disable all rows except for the current turn's row
            board.push(<Row key={i} isDisabled={this.isDisabled(i)} currentColor={this.state.currentColor}/>)
        }
        return board;
    }

    render() {
        //All available colors
        const colors = ["red", "blue", "yellow", "green", "orange"];

        //render the board consisting of rows
        const board = this.renderRows();
        return (
            <div>
                {board}
                <ColorPicker colors={colors} onColorSelected={this.setCurrentColor}/>
            </div>
        );
    }
}

export default Board;