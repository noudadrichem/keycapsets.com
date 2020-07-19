import React, { useState, useEffect } from 'react';

import Button from './Button';
import moment, { Moment } from 'moment';

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
    const KEY: string = 'CTA_ACC_BETA';
    const {} = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timeout: any;
        const KEYVALUE: string = window.localStorage.getItem(KEY);
        const ctaDate: Moment = moment(KEYVALUE);
        const isPast: boolean = moment().diff(ctaDate, 'hours') > 12;
        if (!KEYVALUE) {
            show();
            return;
        }
        if (isPast) {
            show();
            return;
        }
        function show() {
            timeout = setTimeout(() => {
                setVisible(true);
            }, 2700);
        }
        return () => clearTimeout(timeout);
    }, []);

    function close() {
        window.localStorage.setItem(KEY, moment().toString());
        setVisible(false);
    }

    return (
        <div className={`cta-card ${visible ? 'visible' : 'hidden'}`}>
            <CrossIcon onClick={() => close()} />

            <h4>This is the beta for accounts!</h4>
            <p className="light">
                Please report issues and bugs via link below (Github). Check if the issue isn't already reported and if
                it is vote the issue up.
            </p>

            <Button
                onClick={() => (window.location.href = 'https://github.com/noudadrichem/keycapsets.com/issues')}
                variant="primary"
                size="md"
                className="center"
            >
                Report bug
            </Button>
        </div>
    );
}

export default CTACard;
