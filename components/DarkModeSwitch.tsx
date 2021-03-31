import React, { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';
import useStore from '../context';

const STORAGE_KEY = 'DARK_MODE';

const DarkModeSwitch = () => {
    const hasPersistedDarkMode: boolean = window.localStorage.getItem(STORAGE_KEY) !== undefined;
    const setDarkMode = useStore((s) => s.setDarkMode);
    const isDarkModeEnabled =
        (hasPersistedDarkMode && window.localStorage.getItem('darkMode') === 'true') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
        false;

    const darkmodeChanged = (darkModeEnabled: boolean): void => {
        document.documentElement.setAttribute('data-theme', darkModeEnabled ? 'dark' : 'light');
    };

    const darkMode = useDarkMode(isDarkModeEnabled, { onChange: darkmodeChanged, storageKey: STORAGE_KEY });

    useEffect(() => {
        setDarkMode(darkMode.value);
    }, [darkMode.value]);

    return (
        <div onClick={darkMode.toggle} className="nav-item dark-mode-toggle">
            {darkMode.value ? <SunIcon /> : <MoonIcon />}
            <p className="nav-item mobile-only">Show {darkMode.value ? 'light' : 'dark'} mode</p>
        </div>
    );
};

export default DarkModeSwitch;
