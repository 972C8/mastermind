import React from 'react';

class Evaluation extends React.Component {

    render() {
        const keys = this.props.keyPegs;

        //map the keyPegs (red or white) to <span>-elements
        const pegs = keys.map((peg, index) => <span key={index} className={peg}/>);

        return (
            keys.length > 0 &&
            <div className="key-pegs">
                {pegs}
            </div>
        );
    }
}

export default Evaluation;
