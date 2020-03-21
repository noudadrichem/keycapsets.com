import React from 'react';

import ButtonLink from '../components/ButtonLink';
import { Vendor } from "typings";

interface VendorCardProps {
    vendor: Vendor;
}

function VendorCard(props: VendorCardProps): JSX.Element {
    const { vendor } = props;
    const {
        name,
        logoUrl,
        url
    } = vendor;

    return (
        <div className="vendor-card">
            <div className="image">
                <img src={logoUrl === undefined || logoUrl === '' ? '' : logoUrl} alt="Vendor Logo" />
            </div>

            <div className="details">

                <div className="horizontal">
                    <div className="left">
                        <h4 className="">{name}</h4>
                    </div>

                    <div className="right">
                        <ButtonLink href={url}>Go to vendor</ButtonLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VendorCard;
