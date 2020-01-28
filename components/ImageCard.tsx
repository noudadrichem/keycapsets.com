import React from 'react';
import Link from 'next/link'

interface ImageCardProps {
    src: string;
    name: string;
    type: string;
    slug: string;
}

function ImageCard(props: ImageCardProps): JSX.Element {
    const { src, name, type, slug } = props;

    return (
        <div className="image-card">
            <h4 className="center">{name}</h4>

            <Link href="/[type]/[set]" as={`/${type}/${slug}`}>
                <div className="image">
                    <img src={src} />
                </div>
            </Link>
        </div>
    )
}

export default ImageCard;
