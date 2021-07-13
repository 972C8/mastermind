import React from 'react';

class ColorPicker extends React.Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    //Set currentColor to the selected color
    //onColorChange() was passed from Board.js
    handleChange(event) {
        this.props.onColorSelected(event.target.value);
    }

    render() {
        const colors = this.props.colors;

        //Create a button for each color
        const colorButtons = colors.map((color) =>
            <button key={color} value={color} className={"colorpicker btn-peg btn-" + color} onClick={this.handleChange}/>
        )

        return (
            <div className="colorpicker">{colorButtons}</div>
        );
    }

}

export default ColorPicker;