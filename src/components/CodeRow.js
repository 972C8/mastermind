import React from 'react';
import CodePeg from "./CodePeg";

class CodeRow extends React.Component {


    //TODO: Currently useless
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <CodePeg/>
                <CodePeg/>
                <CodePeg/>
                <CodePeg/>
            </div>
        );
    }
}

export default CodeRow;