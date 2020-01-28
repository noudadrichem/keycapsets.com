import React from 'react';
import { useRouter } from 'next/router';
import content from '../content'
import Slider from "react-slick";

import '../assets/styles/main.scss';
import 'slick-carousel/slick/slick.css';

interface SetProps {
}

function SetPage(props: SetProps): JSX.Element {
    const {} = props;
    const router = useRouter();
    const { set: setName } = router.query;

    const set: any = content.keycapsets.find((set: any) => set.name.toLowerCase().replace(/ /g, '-') === setName)

    const slickSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    console.log('set...', set);

    return set !== undefined && (
        <div className="set">
            <h1>{ set.name }</h1>
            <p>type: { set.type }</p>
            <p>Start date of groupbuy: {new Date(set.groupbuydate).getDate}</p>
            <Slider {...slickSettings}>
                {
                    set.imageUrls.map((url: string) => <img src={url} key={url} />)
                }
            </Slider>
        </div>
    )
}

export default SetPage;
