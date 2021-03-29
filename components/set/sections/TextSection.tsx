import React from 'react';
import { Section } from '../../../types/types';

type TextProps = {
    section: Section;
};

function Text(props: TextProps) {
    const { section } = props;

    return (
        <section className="section set-text">
            <div>
                <h2 className="title center">{section.title}</h2>
                <p className="small light" dangerouslySetInnerHTML={{ __html: section.text }}></p>
            </div>
        </section>
    );
}

export default Text;
