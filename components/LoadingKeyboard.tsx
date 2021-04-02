import React from 'react';

import '../assets/styles/loading-keyboard.scss';

import LoadingKeyboardIllustration from './LoadingKeyboardIllustration';

function LoadingKeyboard(): JSX.Element {
    return (
        <div className="container loading-keyboard">
            <h3>Loading...</h3>
            <h5>Do you know what it's typing?</h5>
            <LoadingKeyboardIllustration />
        </div>
    );
}

export default LoadingKeyboard;
