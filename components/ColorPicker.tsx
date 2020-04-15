import React, { useEffect } from 'react';
import ColorPickerLib from 'rc-color-picker';

import useInput from '../hooks/useInput';

interface ColorPickerProps {
    label?: string;
    defaultValue?: string;
    onChange: Function;
}

function ColorPicker(props: ColorPickerProps): JSX.Element {
    const { label, defaultValue = '#ABACAD', onChange } = props;

    const [accentColorValue, accentColorInput, setAccentColor] = useInput({
        label,
        defaultValue,
    });

    function handler(colors) {
        setAccentColor(colors.color);
        onChange(colors.color);
    }

    useEffect(function initColorPickerDefaultValue() {
        handler({ color: defaultValue });
    }, []);

    return (
        <div className={`color-picker-container`}>
            {accentColorInput}
            <ColorPickerLib
                color={accentColorValue}
                alpha={100}
                onChange={handler}
                onClose={handler}
                className="color-picker"
                enableAlpha={false}
            >
                <span className="color-container"></span>
            </ColorPickerLib>
        </div>
    );
}

export default ColorPicker;
