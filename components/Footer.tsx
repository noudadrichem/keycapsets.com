import React from 'react';

interface FooterProps {
    id: String;
}

function Footer(props: FooterProps): JSX.Element {
    const { id } = props;

    return (
       <div className="footer">
           footer
       </div>
    )
}

export default Footer;
