import React from 'react';
import { Kit } from '../../types/interfaces';

interface KitsProps {
    kits: Kit[];
    type: string;
}

function Kits(props: KitsProps): JSX.Element {
    const { kits, type } = props;

    const descriptionClass = kits.map(({ description }) => typeof description).includes('string')
        ? 'has-description'
        : '';

    return (
        <section className="section set-kits">
            <h2 className="title center">{type === 'keyboard' ? 'Features' : 'Kits'}</h2>
            <div className={`set-kits-grid-container ${descriptionClass}`}>
                {kits.map((kit: Kit, idx: number) => {
                    const { name, imgUrl, description } = kit;
                    return (
                        <div key={name + idx} className={`kit-card ${descriptionClass}`}>
                            <div className="kit-card-image-container">
                                <div className="kit-card-image">
                                    <img src={imgUrl} alt={name + '- image'} />
                                </div>
                                <h5 className="center">{name}</h5>
                            </div>
                            {description && <p className="light">{description}</p>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Kits;
