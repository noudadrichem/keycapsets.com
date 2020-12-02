import React, { ReactNode } from 'react';

interface Section {
    title: string;
    children: ReactNode;
}

function Section(props: Section): JSX.Element {
    const { title, children } = props;

    return (
        <section className={`section container section--${title}`}>
            <h3 data-title={title} className="section-title">
                {title}
            </h3>
            <div className="section-main">{children}</div>
        </section>
    );
}

export default Section;
