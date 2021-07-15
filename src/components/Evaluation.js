import React from 'react';

//Render 4 keyPegs of red and white based on evaluation (keys)
const Evaluation = (keys) => {

    //map the keyPegs (red or white) to <span>-elements
    let pegs = keys.keyPegs.map((peg, index) => <span key={index} className={"key-peg key-" + peg}/>);

    //Fill array with default keyPegs so that always 4 keyPegs are rendered
    for (let i = pegs.length; i < 4; i++) {
        pegs.push(<span key={i} className={"key-peg"}/>)
    }

    return (
        <div className="key-pegs">
            {pegs}
        </div>
    );
}

export default Evaluation;
