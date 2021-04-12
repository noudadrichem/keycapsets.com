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
                <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
            </div>
        </section>
    );
}

export default Text;
