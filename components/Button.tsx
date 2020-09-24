import React, { HTMLProps, ReactNode } from 'react';

interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    type: string;
    variant: 'primary' | 'secondary' | 'inverted' | 'tab';
    isDisabled?: boolean;
    isFullWidth?: boolean;
}

function Button(props: ButtonProps & HTMLProps<HTMLButtonElement>): JSX.Element {
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
