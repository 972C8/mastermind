import React from 'react';

class Peg extends React.Component {

    constructor(props) {
        super(props)
        this.state = {color: "white"};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const currentColor = this.props.currentColor;
        const pos = this.props.pos;

        //A row must not have the same color twice
        if (this.props.isValidColor(currentColor)) {
            this.setState({color: currentColor});
            //Update row array of colors
            this.props.setNewColor(pos, currentColor);
        }
    }

    render() {
        return (
            <button value={this.state.color} onClick={this.handleChange}>{this.state.color}</button>
        );
    }
}

export default Peg;