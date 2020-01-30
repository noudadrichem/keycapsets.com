import React from 'react';
import { useRouter } from 'next/router';
import Slider from "react-slick";
import withData from '../../hooks/withData'

import '../../assets/styles/main.scss';
import 'slick-carousel/slick/slick.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_SINGLE_SET_QUERY = gql`
query GET_SINGLE_SET_QUERY($type: String!, $slug:String!){
  keycapsetBySlug(type:$type, slug:$slug) {
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
        vendors {
            name
            url
        }
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

    console.log({ loading, error })
    if (loading) return 'loading...'
    if (error) return `${error}`

    const set = data.keycapsetBySlug;
    console.log({ set })
    return set !== undefined && (
        <div className="set">
            <pre>{JSON.stringify(set, null, 4)}</pre>

            {
                set.imageUrls.length > 0 && (
                    <Slider {...slickSettings}>
                        {
                            set.imageUrls.map((url: string) => <img src={url} key={url} />)
                        }
                    </Slider>
                )
            }
        </div>
    )
}

export default withData(SetPage);
