import React from 'react';
import CodeRow from "./CodeRow";
import ColorPicker from "./ColorPicker";

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxAttempts: 6,
            currentColor: null
        };

        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleColorChange(color) {
        this.setState({
            currentColor: color
        });
    }

    render() {
        //All available colors
        const colors = ["red", "blue", "yellow", "green", "orange"];

        //Create board with amount of rows corresponding to maxAttempts
        const board = [];
        for (let i = 1; i <= this.state.maxAttempts; i++) {
            board.push(<CodeRow key={i}/>)
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