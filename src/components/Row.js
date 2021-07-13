import React from 'react';
import Evaluation from "./Evaluation";

class Row extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            keyPegs: []
        }

        this.handlePegChange = this.handlePegChange.bind(this);
        this.handleCodeGuess = this.handleCodeGuess.bind(this);
    }

    //Called when a peg changes its color
    handlePegChange(pegPos) {
        const row = this.props.row;
        const currentColor = this.props.currentColor;

        //Callback to function with peg data
        this.props.updateColor(row, pegPos, currentColor);
    }

    //Call function to evaluate guessed code and store evaluation in state keyPegs
    handleCodeGuess() {
        const rowPegs = this.props.rowPegs;

        //Row must not contain white as a color for all pegs must be selected
        if (!rowPegs.includes("white")) {
            const keyPegs = this.props.evaluateCodeGuess();

            this.setState({
                keyPegs: keyPegs
            })
        } else {
            //TODO: Popup to select a color for all pegs
            console.log("Select a color for all pegs!")
        }
    }

    //Render a row consisting of 4 pegs (buttons)
    renderRow() {
        const pegs = this.props.rowPegs;

        //Create 4 pegs per row component
        const row = [];
        for (let pos = 0; pos < 4; pos++) {
            const color = pegs[pos];
            //Create button representing a peg
            row.push(<button key={pos} value={color} onClick={() => this.handlePegChange(pos)}>{color}</button>)
        }
        row.push(<button key={"btn" + this.props.row} onClick={this.handleCodeGuess}>Confirm</button>)
        row.push(<Evaluation key={"key" + this.props.row} keyPegs={this.state.keyPegs}/>)
        return row;
    }

    render() {
        const row = this.renderRow();

        return (
            //conditionally add class attribute "disabled"
            <div className={this.props.isDisabled ? "disabled" : undefined}>
                {row}
            </div>
        );
    }
}

export default Row;