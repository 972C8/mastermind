import React from 'react';
import CodePegs from "./CodePegs";

class BoardRow extends React.Component {


    //TODO: Currently useless
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <CodePegs/>
                <CodePegs/>
                <CodePegs/>
                <CodePegs/>
            </div>
        );
    }
}

export default BoardRow;