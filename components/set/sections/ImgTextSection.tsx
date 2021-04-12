import React from 'react';
import { Section } from '../../../types/types';

interface ImgTextSectionProps {
    section: Section;
}

function ImgTextSection(props: ImgTextSectionProps): JSX.Element {
    const { section } = props;

    // TODO needs a TextImg section as well to turn this around..

    return (
        <section className="section set-img-text">
            <div>
                <h2 className="title center">{section.title}</h2>
                <p className="small light" dangerouslySetInnerHTML={{ __html: section.text }}></p>
            </div>
            <div>
                <img src={section.imgUrl} alt="Sketch of the Pneuma keyboard..." />
            </div>
        </section>
    );
}

export default ImgTextSection;
