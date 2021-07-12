import React from 'react';

class Peg extends React.Component {

    constructor(props) {
        super(props)
        this.state = {color: "white"};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({color: this.props.currentColor});
    }

    render() {
        return (
            <button value={this.state.color} onClick={this.handleChange}>{this.state.color}</button>
        );
    }
}

export default Peg;