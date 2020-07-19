import React from 'react';

interface HeartIconProps {
    width?: number;
    height?: number;
    filled?: boolean;
    isDisabled?: boolean;
}

function HeartIcon(props: HeartIconProps): JSX.Element {
    const { width = 18, height = 16, filled = false, isDisabled } = props;
    return (
        <svg
            className={`${isDisabled ? 'disabled' : ''} ${filled ? 'want' : ''}`}
            width={width}
            height={height}
            viewBox="0 0 28 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className={`${filled ? 'show' : 'hide'} heart-fill`}
                d="M27 7.98349C27 4.12656 23.8662 1 20 1C17.4532 1 15.2248 2.35704 14.0002 4.38566C12.7755 2.35704 10.5468 1 8.00003 1C4.13377 1 1 4.12656 1 7.98349C1 9.9904 1.85015 11.7985 3.20913 13.0723H3.20728L13.229 22.6393C13.4128 22.8596 13.6885 23 13.9976 23C14.2839 23 14.5416 22.8789 14.724 22.6855L24.7942 13.0723H24.7912C26.1504 11.7987 27 9.99058 27 7.98349"
                fill="currentColor"
            />
            <path
                d="M27 7.98349C27 4.12656 23.8662 1 20 1C17.4532 1 15.2248 2.35704 14.0002 4.38566C12.7755 2.35704 10.5468 1 8.00003 1C4.13377 1 1 4.12656 1 7.98349C1 9.9904 1.85015 11.7985 3.20913 13.0723H3.20728L13.229 22.6393C13.4128 22.8596 13.6885 23 13.9976 23C14.2839 23 14.5416 22.8789 14.724 22.6855L24.7942 13.0723H24.7912C26.1504 11.7987 27 9.99058 27 7.98349"
                strokeWidth="2"
            />
        </svg>
    );
}

export default HeartIcon;
