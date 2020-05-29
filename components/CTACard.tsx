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
        const KEYVALUE: string = window.localStorage.getItem(KEY);
        const ctaDate: Moment = moment(KEYVALUE);
        const isSixHoursPast: boolean = moment().diff(ctaDate, 'hours') > 6;
        if (!KEYVALUE) {
            show();
            return;
        }
        if (isSixHoursPast) {
            show();
            return;
        }
        function show() {
            setTimeout(() => {
                setVisible(true);
            }, 2700);
        }
    }, []);

    function close() {
        window.localStorage.setItem(KEY, moment().toString());
        setVisible(false);
    }

    return (
        <div className={`cta-card ${visible ? 'visible' : 'hidden'}`}>
            <CrossIcon onClick={() => close()} />

            <h4>We need your help!</h4>
            <p className="light">
                Do you want to test new features such as user accounts, favoriting sets and more? Sign up as beta user!
                <br />
                Do so by joining our Discord server.
            </p>

            <Button
                onClick={() => (window.location.href = 'https://discord.gg/dq8cyMS')}
                variant="primary"
                size="md"
                className="center"
            >
                Join our Discord
            </Button>
        </div>
    );
}

export default CTACard;
