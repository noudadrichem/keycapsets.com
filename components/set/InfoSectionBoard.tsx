import moment from 'moment';
import React from 'react';
import { Keycapset } from '../../types/types';
import { getLabelByBrand } from '../../utils/labels';

interface InfoSectionBoardProps {
    keycapset: Keycapset;
}

function InfoSectionBoard(props: InfoSectionBoardProps): JSX.Element {
    const { keycapset } = props;

    return (
        <section className="section set-info-section">
            <div className="set-info-section-label">
                <label className="label">Designer</label>
                <label className="label large">{keycapset.designerName || 'Unknown'}</label>
            </div>
            <div className="set-info-section-label">
                <label className="label">Groupbuy Type</label>
                <label className="label large">Public unlimited</label>
            </div>
            <div className="set-info-section-label">
                <label className="label">Form factor</label>
                <label className="label large">60%</label>
            </div>
            <div className="set-info-section-label">
                <label className="label">Manufacturer</label>
                <label className="label large">Salvun</label>
            </div>
        </section>
    );
}

export default InfoSectionBoard;
