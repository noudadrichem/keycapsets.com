import React, { useEffect, useState } from 'react';
import Context from '../../context';
import { useApolloClient } from '@apollo/react-hooks';
import { useRouter, Router } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Keycapset, Vendor } from 'typings';
import withGA from 'next-ga';
import withData from '../../hooks/withData';
import countryIsoList from '../../assets/countries';
import continentIsoList from '../../assets/continents';
import { GET_SINGLE_VENDOR_QUERY, GET_SETS_BY_VENDOR } from '../../queries';

import Footer from '../../components/Footer';
import Heading from '../../components/Heading';
import Nav from '../../components/Nav';
import LoadingKeyboard from '../../components/LoadingKeyboard';
import ButtonLink from '../../components/ButtonLink';
import Socials from '../../components/Socials';
import ImageCard from '../../components/ImageCard';

interface SetProps {}

function VendorPage(props: SetProps) {
    const router = useRouter();
    const client = useApolloClient();
    const [vendorSets, setVendorSets] = useState([]);
    const { vendor: slug } = router.query;
    const variables = { slug };

    const { loading, error, data } = useQuery(GET_SINGLE_VENDOR_QUERY, { variables });

    useEffect(() => {
        (async () => {
            if (!loading) {
                const { _id } = data.vendorBySlug;
                const sets = await fetchVendorSets(_id);

                setVendorSets(sets.data.keycapsetsByVendor);
            }
        })();
    }, [loading, data]);

    async function fetchVendorSets(id: String): Promise<any> {
        const fetchVendorSetsResult = await client.query({
            query: GET_SETS_BY_VENDOR,
            variables: { id },
        });
        return fetchVendorSetsResult;
    }

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    }

    const vendor: Vendor = data.vendorBySlug;

    const vendorRegion = () => {
        const [vendorContinent, vendorCountry] = vendor.country.split('-');

        if (typeof vendorCountry === 'undefined') {
            return continentIsoList.find((continent) => {
                return continent.continentCode === vendorContinent;
            });
        }

        return countryIsoList.find((country) => {
            return country.continentCode === vendorContinent && country.twoLetterCountryCode === vendorCountry;
        });
    };

    return (
        vendor !== undefined && (
            <div className="vendor">
                <Nav />

                <div className="container large">
                    <Heading left mainTitle={vendor.name} subTitle={`Good luck with sharing!`} />

                    <div className="info-section">
                        <div>
                            <img src={vendor.logoUrl} />
                        </div>

                        <div>
                            <h3>Info</h3>
                            <p>Name: {vendor.name}</p>
                            {vendorRegion().continentName ? <p>Continent: {vendorRegion().continentName}</p> : null}
                            {vendorRegion().countryName ? <p>Country: {vendorRegion().countryName}</p> : null}

                            <Socials socials={vendor.socials} />

                            <ButtonLink isLarge href={vendor.url}>
                                Visit the website
                            </ButtonLink>
                        </div>
                    </div>

                    {vendorSets.length > 0 ? (
                        <div className="vendor__keycapsets">
                            <h3>Keycapsets</h3>
                            <div className="images-container">
                                {vendorSets.map((keycapset: Keycapset) => (
                                    <ImageCard {...{ keycapset }} key={keycapset._id} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                <Footer />
            </div>
        )
    );
}

export default withGA('UA-115865530-2', Router)(withData(VendorPage));
