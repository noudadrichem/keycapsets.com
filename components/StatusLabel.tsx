import React from 'react';
import moment from 'moment';
import Pill from './Pill';

interface StatusLabelProps {
    groupbuyStartDate?: string;
    groupbuyEndDate?: string;
    isIc?: boolean;
}
enum Labels {
    IC = 'Interest check',
    AWAITING = 'Awaiting groupbuy',
    INGROUPBUY = 'In groupbuy',
}

export const getDayDifference = (date: string | number) => moment(date).diff(moment(), 'days');

function StatusLabel(props: StatusLabelProps): JSX.Element {
    const { groupbuyStartDate, groupbuyEndDate, isIc } = props;

    const awaitingGroupbuy: boolean = moment().diff(groupbuyStartDate, 'days') < 0;
    const inGroupbuy: boolean = getDayDifference(groupbuyEndDate) > 0;

    if (isIc) {
        return <Pill color="orange" text={Labels.IC} />;
    } else if (awaitingGroupbuy) {
        return <Pill color="green" text={Labels.AWAITING} />;
    } else if (inGroupbuy) {
        return <Pill color="green" text={Labels.INGROUPBUY} />;
    }

    return null;
}

export default StatusLabel;
