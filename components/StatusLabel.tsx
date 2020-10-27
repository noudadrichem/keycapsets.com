import React from 'react';
import moment from 'moment';
import Pill from './Pill';

interface StatusLabelProps {
    groupbuyStartDate?: string;
    groupbuyEndDate?: string;
    isIc?: boolean;
    isEnded?: boolean;
}
enum Labels {
    IC = 'Awaiting interest check',
    ENDED = 'Groupbuy ended',
}

export const getDayDifference = (date: string | number) => moment(date).diff(moment(), 'days') + 1;

function StatusLabel(props: StatusLabelProps): JSX.Element {
    const { groupbuyStartDate, groupbuyEndDate, isIc } = props;

    const awaitingGroupbuy: boolean = moment().diff(groupbuyStartDate, 'days') < 0;
    const inGroupbuy: boolean = getDayDifference(groupbuyEndDate) >= 0;
    const isEnded: boolean = getDayDifference(groupbuyEndDate) < 0;

    if (isIc) {
        return <Pill color="orange" text={Labels.IC} />;
    } else if (awaitingGroupbuy) {
        return (
            <Pill
                color="orange"
                children={<span className="bold"> Starting in {getDayDifference(groupbuyStartDate)} days</span>}
            />
        );
    } else if (inGroupbuy) {
        const color = getDayDifference(groupbuyEndDate) < 7 ? 'red' : 'green';

        return (
            <Pill
                color={color}
                children={<span className="bold"> Ending in {getDayDifference(groupbuyEndDate)} days</span>}
            />
        );
    } else if (isEnded) {
        return <Pill color="blue" text={Labels.ENDED} />;
    }

    return null;
}

export default StatusLabel;
