import React, { ReactNode } from 'react';
import ImageModal from '../ImageModal';

interface KitProps {
    name: String;
    description?: String;
    imgUrl: String;
}

function Kit(props: KitProps): JSX.Element {
    const { name, description, imgUrl } = props;

    return (
        <div className="kit container">
            <div className="kit__cover">
                <ImageModal src={imgUrl} />
            </div>
            <div className="kit__info">
                <h3 data-name={name} className="kit__info-name">
                    {name}
                </h3>
                <p className="kit__info-description">{description}</p>
            </div>
        </div>
    );
}

export default Kit;
