import React, { ReactNode } from 'react'
import ArrowRight from './Arrow';

import '../assets/styles/button-link.scss';
import Link from 'next/link';

interface LinkProps {
    className?: string;
    children?: ReactNode;
    href: string;
    as?: string;
}
/*
    className = {`btn ${className} ${variant} ${size} ${type} ${isFullWidth ? 'full-width' : ''}`}
    onClick = { onClick }
 */
function ButtonLink(props: LinkProps): JSX.Element {
    const {children, href, as } = props;

    return (
        <div className="button-link arrow-right">
            {
                href.startsWith('http')
                ? (
                    <a href={href}>
                        {children}
                    </a>
                )
                : (
                    <Link href={href} as={as}>
                        {children}
                    </Link>
                )
            }
            <ArrowRight size={16} />
        </div>
    )
}

export default ButtonLink
