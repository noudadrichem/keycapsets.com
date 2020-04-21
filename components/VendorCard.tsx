import React from 'react';
import Link from 'next/link';

import ButtonLink from '../components/ButtonLink';
import { Vendor } from 'typings';

interface VendorCardProps {
    vendor: Vendor;
}

function VendorCard(props: VendorCardProps): JSX.Element {
    const { vendor } = props;
    const { name, logoUrl, url, slug } = vendor;

    return (
        <Link href="/vendors/[vendor]" as={`/vendors/${slug}`}>
            <div className="vendor-card">
                <div className="image">
                    <img
                        src={
                            logoUrl === undefined || logoUrl === ''
                                ? `https://via.placeholder.com/400x300/f2f2f2?text=${name}`
                                : logoUrl
                        }
                        alt={name}
                    />
                </div>

                <div className="details">
                    <div className="horizontal">
                        <div className="left">
                            <h4>{name}</h4>
                        </div>

                        <div className="right">
                            <ButtonLink href="/vendors/[vendor]" as={`/vendors/${slug}`}>
                                Go to vendor
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default VendorCard;
