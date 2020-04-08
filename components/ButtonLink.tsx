import React, { ReactNode } from "react";
import ArrowRight from "./Arrow";

import "../assets/styles/button-link.scss";

interface LinkProps {
    className?: string;
    children?: ReactNode;
    href?: string;
    isHovered?: boolean;
    isLarge?: boolean;
}

function ButtonLink(props: LinkProps): JSX.Element {
    const { children, href, isHovered = false, isLarge = false } = props;

    return (
        <div
            className={`button-link arrow-right ${isHovered ? "hover" : ""} ${
                isLarge ? "large" : ""
            }`}
        >
            {href ? (
                <a href={href} target="_blank">
                    {children}
                </a>
            ) : (
                children
            )}
            <ArrowRight size={16} />
        </div>
    );
}

export default ButtonLink;
