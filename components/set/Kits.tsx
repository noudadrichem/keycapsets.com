import React from 'react';
import { Kit } from '../../types/types';
import ImageModal from '../ImageModal';

interface KitsProps {
    kits: Kit[];
    type: string;
}

function Kits(props: KitsProps): JSX.Element {
    const { kits, type } = props;

    const descriptionClass = ''; // kits.map(({ description }) => typeof description).includes('string') ? 'has-description' : '';

    const isKeyboard = type === 'keyboard';

    return (
        <section className={`section set-kits ${isKeyboard ? 'keyboard' : 'keycapset'}`}>
            <h2 className="title center">{isKeyboard ? 'Features' : 'Kits'}</h2>
            <div className={`set-kits-grid-container ${descriptionClass}`}>
                {kits.map((kit: Kit, idx: number) => {
                    const { name, imgUrl, description } = kit;
                    return (
                        <div key={name + idx} className={`kit-card ${descriptionClass}`}>
                            {isKeyboard && <h5 className="title center">{name}</h5>}
                            <div className="kit-card-image">
                                <ImageModal src={imgUrl} alt={name + '-image'} />
                            </div>
                            {!isKeyboard && <h5 className="title center">{name}</h5>}

                            {description && <p className="description light small">{description}</p>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Kits;
