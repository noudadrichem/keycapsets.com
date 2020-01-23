import React, {ReactNode} from 'react'

interface ButtonProps {
    size: String;
    type: String,
    variant: String;
    className?: String;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    children?: ReactNode;
}

function Button(props: ButtonProps): JSX.Element {
    const {
        size,
        type,
        variant,
        isDisabled,
        isFullWidth,
        children,
        className
    } = props;

    return (
        <button
            className={`btn ${className} ${variant} ${size} ${type} ${isFullWidth ? 'full-width' : ''}`}
            disabled={isDisabled}
        >
            { children }
        </button>
    )
}

Button.defaultProps = {
    type: 'button'
}

export default Button
