import React, { HTMLProps, ReactNode } from 'react';

interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    type: string;
    variant: 'primary' | 'secondary' | 'inverted' | 'tab';
    isDisabled?: boolean;
    isFullWidth?: boolean;
    className?: string;
    children: any;
    style?: any;
}

function Button(props: ButtonProps) {
    const { size, type, variant, isDisabled, isFullWidth, children, className, ...rest } = props;

    return (
        <button
            className={`btn ${variant} ${size} ${type} ${className} ${isFullWidth ? 'full-width' : ''}`}
            disabled={isDisabled}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
    size: 'md',
    variant: 'secondary',
};

export default Button;
