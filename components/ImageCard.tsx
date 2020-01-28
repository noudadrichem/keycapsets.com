import React from 'react';
import Link from 'next/link'

interface ImageCardProps {
    src: string;
    name: string;
}

function ImageCard(props: ImageCardProps): JSX.Element {
    const { src, name } = props;

    return (
        <div className="image-card">
            <h4 className="center">{name}</h4>

            <Link href="/[set]" as={`/${name.toLowerCase().replace(/ /g, '-')}`}>
                <div className="image">
                    <img src={src} />
                </div>
            </Link>
        </div>
    )
}

export default ImageCard;
