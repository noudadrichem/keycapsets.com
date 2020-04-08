import React, { useState} from 'react';

import ButtonLink from '../components/ButtonLink';
import { Vendor } from "typings";

interface VendorCardProps {
    vendor: Vendor;
}

function VendorCard(props: VendorCardProps): JSX.Element {

    const [ isHovered, setHover ] = useState(false)

    const { vendor } = props;
    const {
        name,
        logoUrl,
        url
    } = vendor;

    return (
        <a href={url} target="_blank">
            <div className="vendor-card" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className="image">
                    <img src={logoUrl === undefined || logoUrl === '' ? `https://via.placeholder.com/400x300/f2f2f2?text=${name}` : logoUrl} alt={name} />
                </div>

                <div className="details">

                    <div className="horizontal">
                        <div className="left">
                            <h4>{name}</h4>
                        </div>

                        <div className="right">
                            <ButtonLink isHovered={isHovered}>Go to vendor</ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default VendorCard;
