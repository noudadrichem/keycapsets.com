import React, { ReactNode } from 'react';

interface Vendors {
    vendors?: ReactNode[];
}

function Vendors(props: Vendors): JSX.Element {
    const { vendors } = props;

    if (!vendors.length) return <p className="section--empty"> No vendors announced, yet... </p>;

    return (
        <div className="vendors">
            {vendors.map((vendor) => (
                <div>vendor.name</div> // TODO: Fix once vendors have been selected.
            ))}
        </div>
    );
}

Vendors.defaultProps = {
    vendors: [],
};

export default Vendors;
