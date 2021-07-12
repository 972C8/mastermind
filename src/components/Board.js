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

        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleColorChange(color) {
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
        //All available colors
        const colors = ["red", "blue", "yellow", "green", "orange"];

        //Create board with amount of rows corresponding to maxAttempts
        const board = [];
        for (let i = 1; i <= this.state.maxAttempts; i++) {
            //disable all rows except for the current turn's row
            board.push(<Row key={i} isDisabled={this.isDisabled(i)} currentColor={this.state.currentColor}/>)
        }

        return (
            <div>
                {board}
                <ColorPicker colors={colors} onColorChange={this.handleColorChange}/>
            </div>
        );
    }
}

export default Board;