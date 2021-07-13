import React from 'react';

class Row extends React.Component {

    constructor(props) {
        super(props)

        this.isValidColor = this.isValidColor.bind(this);
        this.handlePegChange = this.handlePegChange.bind(this);
    }

    //TODO: Fix method isValidColor
    //A row must not have the same color twice
    isValidColor(newColor) {
        return true;
        /*
        const rowPegs = this.state.rowPegs;

        //Only return true if the new color is not yet in rowPegs
        if (!rowPegs.includes(newColor)) {
            this.setState(rowPegs)
            return true;
        }
        return false;
        */
    }

    //Called when a peg changes its color
    handlePegChange(pegPos) {
        const currentColor = this.props.currentColor;
        const row = this.props.row;

        //A row must not have the same color twice
        if (this.isValidColor(currentColor)) {
            //Update row array of colors
            this.props.updateColor(row, pegPos, currentColor);
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