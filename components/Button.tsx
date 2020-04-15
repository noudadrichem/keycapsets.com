import React, { ReactNode } from 'react';

interface ButtonProps {
    size?: String;
    type: String;
    variant: String;
    className?: String;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    children?: ReactNode;
    onClick: any;
}

function Button(props: ButtonProps): JSX.Element {
    const {
        size,
        type,
        variant,
        isDisabled,
        isFullWidth,
        children,
        className,
        onClick,
    } = props;

    return (
        <button
            className={`btn ${variant} ${size} ${type} ${className} ${
                isFullWidth ? 'full-width' : ''
            }`}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
};

export default Button;
