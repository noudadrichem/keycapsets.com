import React, { useState } from 'react';
import Toggle from 'react-toggle';
import useDarkMode from 'use-dark-mode';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

const STORAGE_KEY = 'DARK_MODE';

const DarkModeSwitch = () => {
    const hasPersistedDarkMode: boolean = window.localStorage.getItem(STORAGE_KEY) !== undefined;
    const isDarkModeEnabled =
        (hasPersistedDarkMode && window.localStorage.getItem('darkMode') === 'true') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
        false;

    const darkmodeChanged = (darkModeEnabled: boolean): void => {
        document.documentElement.setAttribute('data-theme', darkModeEnabled ? 'dark' : 'light');
    };

    const darkMode = useDarkMode(isDarkModeEnabled, { onChange: darkmodeChanged, storageKey: STORAGE_KEY });

    return (
        <div onClick={darkMode.toggle} className="dark-mode-toggle">
            {darkMode.value ? <SunIcon /> : <MoonIcon />}
        </div>
    );
};

export default DarkModeSwitch;
