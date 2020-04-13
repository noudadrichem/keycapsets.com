import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import '../assets/styles/cta-card.scss';
import Button from './Button';
import Link from 'next/link';
import moment from 'moment';

const CrossIcon = ({ size = 16, color = '#566073', onClick }) => (
    <svg
        onClick={onClick}
        className="close-cross"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

interface CTACardProps {}

function CTACard(props: CTACardProps): JSX.Element {
    const {} = props;
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const CTADate = window.localStorage.getItem('CTA');
        if (!CTADate) {
            setTimeout(() => {
                setVisible(true);
            }, 1700);
        }
    }, []);

    function close() {
        window.localStorage.setItem('CTA', moment().toString());
        setVisible(false);
    }

    return (
        <div className={`cta-card ${visible ? 'visible' : 'hidden'}`}>
            <CrossIcon onClick={() => close()} />

            <h4>Live and learn.</h4>
            <p className="light">
                We're sad to announce we are temporarily closing the website for
                uploads due to incidents that occurred by it.
            </p>

            <Button
                onClick={() => router.push('/upload-statement')}
                variant="primary"
                size="md"
                className="center"
            >
                More about it here
            </Button>
        </div>
    );
}

export default CTACard;
