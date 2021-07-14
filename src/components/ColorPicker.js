import React from 'react';

//Return a div of buttons for all colors provided. The selected color is stored with updateSelectedColor
const ColorPicker = ({colors, updateSelectedColor}) => {

    //Create a button for each color
    const colorButtons = colors.map((color) =>
        <button key={color} value={color} className={"colorpicker btn-peg btn-" + color}
                onClick={() => updateSelectedColor(color)}/>
    )

    return (
        <div className="colorpicker">{colorButtons}</div>
    );
};

export default ColorPicker;