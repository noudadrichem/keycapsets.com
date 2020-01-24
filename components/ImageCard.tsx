import React from 'react';

interface ImageCardProps {
    src: string;
    name: string;
}

function ImageCard(props: ImageCardProps): JSX.Element {
    const { src, name } = props;

    return (
        <div className="image-card">
            <h4 className="center">{name}</h4>

            <div className="image">
                <img src={src} />
            </div>
        </div>
    )
}

export default ImageCard;
