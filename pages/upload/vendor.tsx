import path from 'path';
import fs from 'fs';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import withGA from 'next-ga';
import Router from 'next/router';

import '../../assets/styles/main.scss';
import { CREATE_VENDOR_MUTATION } from '../../queries';

import useInput from '../../hooks/useInput';
import withData from '../../hooks/withData';

import MultipleInputs from '../../components/MultipleInputs'
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Meta from '../../components/Meta';
import Multiselect from '../../components/Multiselect';

interface UploadVendorProps {
    countries: any[];
    continents: any[];
}

function UploadVendor(props: UploadVendorProps) {
    const { countries, continents } = props;
    const [nameValue, nameInput, setName] = useInput({ label: 'Name:'});
    const [countryValue, setCountry] = useState<any>({ label: 'Netherlands', value: 'NL' });
    const [continentValue, setContinent] = useState<any>({ label: "Europe", value: "EU" });
    const [logoUrlValue, logoUrlInput, setLogoInput] = useInput({ label: 'Logo url:'});
    const [urlValue, urlInput, setUrl] = useInput({ label: 'Website address:'});
    const [socials, setSocials] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [shouldReset, setShouldReset] = useState<boolean>(false);
    const [addVendor, mutationResponse] = useMutation<string>(CREATE_VENDOR_MUTATION);

    useEffect(() => {
        console.log({ countries, continents })
    }, [])

    async function uploadVendor() {
        const variables = {
            name: nameValue,
            country: `${continentValue.value}-${countryValue.value}`,
            logoUrl: logoUrlValue,
            url: urlValue,
            socials
        };
        console.log(variables);
        const result = await addVendor({ variables });
        console.log('result', result);

        reset();
    }

    function reset() {
        setName('');
        setCountry('');
        setLogoInput('');
        setUrl('');
        setSocials([]);

        setShouldReset(true)
        setTimeout(() =>  {
            setShouldReset(false)
        })
    }

    return (
        <>
            <Meta />
            <Nav />
            <div className="container upload">
                <Heading mainTitle="By adding yourself as a vendor" subTitle="Make yourself famous!" left />

                <div className="grid-container">
                    <div className="column">
                        {nameInput}

                        <Multiselect
                            label="Country"
                            onChange={(selectedCountry: any) => setCountry(selectedCountry)}
                            options={countries}
                            defaultValue={{ label: 'Netherlands', value: 'NL'}}
                        />
                        <Multiselect
                            label="Continents"
                            onChange={(selectedContinent: any) => setContinent(selectedContinent)}
                            options={continents}
                            defaultValue={{ label: "Europe", value: "EU"}}
                        />

                        {logoUrlInput}
                        {urlInput}
                        <MultipleInputs
                            label="Social links..."
                            onChange={(socials: string[]) => {
                                console.log('change socials...', socials)
                                setSocials(socials)
                            }}
                            shouldReset={shouldReset}
                        />

                        <Button
                            onClick={uploadVendor}
                            variant="primary"
                            size="sm"
                            className="align-right"
                            >
                            {loading ? 'Adding...' : 'Add vendor'}
                        </Button>
                    </div>
                </div>


            </div>
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    const filepath = process.cwd() + '/assets/countries.json';
    const fileContents = fs.readFileSync(filepath, 'utf8')
    const countries = JSON.parse(fileContents);

    const countriesFormatted: any[] = countries.map((country: any) => {
        return {
            label: country.countryName,
            value: country.twoLetterCountryCode
        }
    });

    const continentsFormatted = countries
        .reduce((res, country) => {
            if (!res[1].includes(country.continentCode)) {
                res[1].push(country.continentCode);
                res[0].push(country);
            }
            return res;
        }, [[],[]])[0]
        .map((country: any) => {
            return {
                label: country.continentName,
                value: country.continentCode
            }
        });


    return {
        props: {
            countries: countriesFormatted,
            continents: continentsFormatted
        }
    }
}

export default withGA('UA-115865530-2', Router)(withData(UploadVendor));
