import React, { ReactNode } from 'react';

interface Updates {
    updates?: ReactNode[];
}

function Updates(props: Updates): JSX.Element {
    const { updates } = props;

    if (!updates.length) return <p className="section--empty"> No updates, yet... </p>;

    return (
        <div className="updates">
            {updates.map((updates) => (
                <div>updates.name</div> // TODO: Fix once updates have been added..
            ))}
        </div>
    );
}

Updates.defaultProps = {
    updates: [],
};

export default Updates;
