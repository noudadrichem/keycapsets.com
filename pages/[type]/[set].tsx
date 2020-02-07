import React from 'react';
import { useRouter } from 'next/router';
import Slider from "react-slick";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import withData from '../../hooks/withData'
import { GET_SINGLE_SET_QUERY } from '../../queries';

import 'slick-carousel/slick/slick.css';
import '../../assets/styles/main.scss';

import Footer from '../../components/Footer';
import Heading from '../../components/Heading';

interface SetProps {}

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

    if (loading) return 'loading...';
    if (error) return `${error}`;

    const set = data.keycapsetBySlug;
    return set !== undefined && (
        <div className="set">
            <Heading
                mainTitle={`we are currently working hard on a page for ${set.name}`}
                subTitle="Come back later or send an email to info@keycapsets.com"
                isHome
            />
            {/* <pre>{JSON.stringify(set, null, 4)}</pre>

            {
                set.imageUrls.length > 0 && (
                    <Slider {...slickSettings}>
                        {
                            set.imageUrls.map((url: string) => <img src={url} key={url} />)
                        }
                    </Slider>
                )
            } */}

            <Footer />
        </div>
    )
}

export default withData(SetPage);
