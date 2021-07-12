import React from 'react';
import Peg from "./Peg";

class Row extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            rowColors: Array(4).fill("white")
        }

        this.isValidColor = this.isValidColor.bind(this);
        this.setNewColor = this.setNewColor.bind(this);
    }

    //A row must not have the same color twice
    isValidColor(newColor) {
        const rowColors = this.state.rowColors;

        //Only return true if the new color is not yet in rowColors
        if (!rowColors.includes(newColor)) {
            this.setState(rowColors)
            return true;
        }
        return false;
    }

    setNewColor(pos, newColor) {
        //Update array with new color
        const colors = this.state.rowColors.slice();
        colors[pos] = newColor;

        this.setState({
            rowColors: colors
        })
    }

    render() {
        //Create 4 pegs per row component
        const pegs = [];
        for (let pos = 1; pos <= 4; pos++) {
            pegs.push(<Peg key={pos} pos={pos} currentColor={this.props.currentColor}
                           isValidColor={this.isValidColor} setNewColor={this.setNewColor}/>);
        }

        return (
            //conditionally add class attribute "disabled"
            <div className={this.props.isDisabled ? "disabled" : undefined}>
                {pegs}
            </div>
        );
    }
}

export default Row;