import React from 'react';

class CodePegs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {color: 'white'};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({color: 'blue'});
    }

    render() {
        return (
            <button onClick={this.handleChange}>{this.state.color}</button>
        );
    }
}

export default CodePegs;