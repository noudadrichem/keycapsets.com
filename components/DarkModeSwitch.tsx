import React, { useState } from 'react';
import Toggle from 'react-toggle';
import useDarkMode from 'use-dark-mode';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

const DarkModeSwitch = () => {
    const storageKey = 'darkMode';
    let isDarkModeEnabled = true;
    try {
        isDarkModeEnabled = localStorage.getItem(storageKey) === 'true';
    } catch (err) {}

    const darkmodeChanged = (darkModeEnabled: boolean): void => {
        document.documentElement.setAttribute('data-theme', darkModeEnabled ? 'dark' : 'light');
    };

    const darkMode = useDarkMode(isDarkModeEnabled, { onChange: darkmodeChanged });
    return (
        <div>
            <span onClick={darkMode.disable}>
                <SunIcon isSelected={!darkMode.value} />
            </span>
            <Toggle checked={darkMode.value} icons={false} onChange={darkMode.toggle} />
            <span onClick={darkMode.enable}>
                <MoonIcon isSelected={darkMode.value} />
            </span>
        </div>
    );
};

export default DarkModeSwitch;
