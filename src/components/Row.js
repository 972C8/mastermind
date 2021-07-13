import React from 'react';

class Row extends React.Component {

    constructor(props) {
        super(props)

        this.handlePegChange = this.handlePegChange.bind(this);
    }

    //Called when a peg changes its color
    handlePegChange(pegPos) {
        const row = this.props.row;
        const currentColor = this.props.currentColor;

        //Callback to function with peg data
        this.props.updateColor(row, pegPos, currentColor);
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