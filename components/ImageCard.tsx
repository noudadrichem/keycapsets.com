import React from 'react';
import Link from 'next/link';
import ButtonLink from '../components/ButtonLink';
import Pill from '../components/Pill';

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
            <div className="image">
                <img src={src} />
                <Pill />
            </div>

            <div className="details">

                <div className="horizontal">
                    <div className="left">
                        <h4 className="">{name}</h4>

                        <div>
                            <span className="bold">24</span> days left in groupbuy!
                        </div>
                    </div>

                    <div className="right">
                        <ButtonLink
                            href="/[type]/[set]"
                            as={`/${type}/${slug}`}
                        >View this set</ButtonLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImageCard;
