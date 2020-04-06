import React from 'react';
import moment from 'moment';
import { useRouter, Router } from 'next/router';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { Keycapset, Vendor } from 'typings';
import withGA from 'next-ga';

import withData from '../../hooks/withData'
import { GET_SINGLE_VENDOR_QUERY, GET_SETS_BY_VENDOR } from '../../queries';

import Footer from '../../components/Footer';
import Heading from '../../components/Heading';
import Nav from '../../components/Nav';
import LoadingKeyboard from '../../components/LoadingKeyboard';
import ButtonLink from '../../components/ButtonLink';
import Images from '../../components/Images';
import Meta from '../../components/Meta';

interface SetProps {}

function VendorPage(props: SetProps) {
    const router = useRouter();
    const { vendor: slug } = router.query;

    console.log({ slug })
    let variables = { slug }
    console.log(variables);

    const { loading, error, data } = useQuery(GET_SINGLE_VENDOR_QUERY, { variables });

    console.log(data);

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    }

    const vendor: Vendor = data.vendorBySlug;
    variables = { vendorId: vendor._id }

    const keycapsets = useQuery(GET_SETS_BY_VENDOR, { variables });

    // console.log(keycapsets);



    return vendor !== undefined && (
      <div className="vendor">
          <Meta
              // title={`${set.type.toUpperCase()} Keycapset ${set.name}`}
              // metaImgUrl={set.coverImageUrl}
          />

          <Nav />

          <div className="container">
              <Heading
                  left
                  mainTitle={vendor.name}
                  subTitle={`Good luck with sharing!`}
              />

              <div className="info-section">
                  <div>
                    <img src={vendor.logoUrl} />
                  </div>

                  <div>
                      <h3>Info</h3>
                  </div>

              </div>

              <Images keycapsets={[]} />

          </div>

          <Footer />
      </div>
    )
}

export default withGA('UA-115865530-2', Router)(withData(VendorPage));
