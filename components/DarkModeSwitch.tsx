import React from 'react';
import Toggle from 'react-toggle';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

interface DarkModeSwitchProps {
    enableDarkMode?: () => void;
    disableDarkMode?: () => void;
    toggleDarkMode?: () => void;
    isDarkModeEnabled: boolean;
}

const DarkModeSwitch = (props: DarkModeSwitchProps) => {
    const { enableDarkMode, disableDarkMode, toggleDarkMode, isDarkModeEnabled } = props;

    console.log({ isDarkModeEnabled });
    return (
        <div>
            <span onClick={disableDarkMode}>
                <SunIcon isSelected={!isDarkModeEnabled} />
            </span>
            <Toggle checked={isDarkModeEnabled} icons={false} onChange={toggleDarkMode} />
            <span onClick={enableDarkMode}>
                <MoonIcon isSelected={isDarkModeEnabled} />
            </span>
        </div>
    );
};

export default DarkModeSwitch;
