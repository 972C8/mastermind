import React from 'react';

class ColorPicker extends React.Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    //Set currentColor to the picked color
    //onColorChange() was passed from Board.js
    handleChange(event) {
        this.props.onColorChange(event.target.value);
    }

    render() {
        const colors = this.props.colors;

        //Create a button for each color
        const colorButtons = colors.map((color) =>
            <button key={color} value={color} onClick={this.handleChange}>{color}</button>
        )

        return (
            <div>{colorButtons}</div>
        );
    }

}

export default ColorPicker;