import React from 'react';
import { useRouter } from 'next/router';
import Slider from "react-slick";
import withData from '../../hooks/withData'

import '../../assets/styles/main.scss';
import 'slick-carousel/slick/slick.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_SINGLE_SET_QUERY = gql`
query getSingleQuery($slug: String!, $type: String!) {
    keycapsetOne(filter: { slug: $slug, type: $type}) {
        _id
        name
        type
        coverImageUrl
        groupbuyStartDate
        groupbuyEndDate
        active
        coverImageUrl
        imageUrls
        websiteUrl
        vendors
        slug
    }
}
`

interface SetProps {
}

function SetPage(props: SetProps) {
    const router = useRouter();
    const { set: slug, type } = router.query;
    const variables = { slug, type }
    const { loading, error, data } = useQuery(GET_SINGLE_SET_QUERY, { variables });

    const slickSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (loading) return null
    if (error) return `${error}`

    const set = data.keycapsetOne;
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

export default withData(SetPage);
