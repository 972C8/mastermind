import React from 'react';
import Peg from "./Peg";

class Row extends React.Component {

    //TODO: Currently useless
    constructor(props) {
        super(props)
    }

    render() {
        //Create 4 pegs per row component
        const pegs = [];
        for (let i = 1; i <= 4; i++) {
            pegs.push(<Peg key={i} currentColor={this.props.currentColor}/>);
        }

        return (
            //conditionally add class attribute "disabled"
            <div className={this.props.isDisabled ? "disabled" : ""}>
                {pegs}
            </div>
        );
    }
}

export default Row;