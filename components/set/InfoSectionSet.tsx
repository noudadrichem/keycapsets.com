import moment from 'moment';
import React from 'react';
import { Keycapset } from '../../types/interfaces';
import { getLabelByBrand } from '../../utils/labels';

interface InfoSectionSetProps {
    keycapset: Keycapset;
}

function InfoSectionSet(props: InfoSectionSetProps): JSX.Element {
    const { keycapset } = props;

    return (
        <section className="section set-info-section">
            {!keycapset.isInterestCheck && (
                <div className="set-info-section-label">
                    <label className="label">Start date</label>
                    <label className="label large">{moment(keycapset.groupbuyStartDate).format('Do MMM YYYY')}</label>
                </div>
            )}
            {!keycapset.isInterestCheck && (
                <div className="set-info-section-label">
                    <label className="label">End date</label>
                    <label className="label large">{moment(keycapset.groupbuyEndDate).format('Do MMM YYYY')}</label>
                </div>
            )}
            <div className="set-info-section-label">
                <label className="label">Designer</label>
                <label className="label large">{keycapset.designerName || 'Unknown'}</label>
            </div>
            <div className="set-info-section-label">
                <label className="label">Brand</label>
                <label className="label large">{getLabelByBrand(keycapset.brand) || 'Unknown'}</label>
            </div>
            <div className="set-info-section-label">
                <label className="label">Material</label>
                <label className="label large">{keycapset.material.toUpperCase() || 'Unknown'}</label>
            </div>
            <div className="set-info-section-label">
                <label className="label">Profile</label>
                <label className="label large">{keycapset.type}</label>
            </div>
        </section>
    );
}

export default InfoSectionSet;
