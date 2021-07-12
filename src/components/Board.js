import React from 'react';
import BoardRow from "./BoardRow";


class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxAttempts: 6
        };
    }

    render() {
        //Create board with amount of rows corresponding to maxAttempts
        const board = [];
        for (let i = 1; i <= this.state.maxAttempts; i++) {
            board.push(<BoardRow key={i} />)
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;