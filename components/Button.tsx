import React, { ReactNode } from 'react';

interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    type: String;
    variant: 'primary' | 'secondary' | 'inverted' | 'tab';
    className?: String;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    children?: ReactNode;
    onClick?: any;
    style?: any;
}

function Button(props: ButtonProps): JSX.Element {
    const { size, type, variant, isDisabled, isFullWidth, children, className, onClick, style } = props;

    return (
        <button
            className={`btn ${variant} ${size} ${type} ${className} ${isFullWidth ? 'full-width' : ''}`}
            disabled={isDisabled}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
    size: 'md',
};

export default Button;
