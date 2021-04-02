import path from 'path';
import fs from 'fs';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import withGA from 'next-ga';
import Router from 'next/router';
import countries from '../../assets/countries';
import { CREATE_VENDOR_MUTATION } from '../../queries';

import useInput from '../../hooks/useInput';

import MultipleInputs from '../../components/MultipleInputs';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Meta from '../../components/Meta';
import Multiselect from '../../components/Multiselect';

interface UploadVendorProps {
    // countries: any[];
    // continents: any[];
}

function UploadVendor(props: UploadVendorProps) {
    return null;
    // const {} = props;
    // const [nameValue, nameInput, setName] = useInput({ label: 'Name:' });
    // const [countryValue, setCountry] = useState<any>({
    //     label: 'Netherlands',
    //     value: 'NL',
    // });
    // const [continentValue, setContinent] = useState<any>({
    //     label: 'Europe',
    //     value: 'EU',
    // });
    // const [logoUrlValue, logoUrlInput, setLogoInput] = useInput({
    //     label: 'Logo url:',
    // });
    // const [urlValue, urlInput, setUrl] = useInput({
    //     label: 'Website address:',
    // });
    // const [socials, setSocials] = useState<any[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [shouldReset, setShouldReset] = useState<boolean>(false);
    // const [addVendor, mutationResponse] = useMutation<string>(CREATE_VENDOR_MUTATION);

    // // useEffect(() => {
    // //     Router.push('/');
    // // });

    // const countriesFormatted: any[] = countries.map((country: any) => {
    //     return {
    //         label: country.countryName,
    //         value: country.twoLetterCountryCode,
    //     };
    // });

    // const continentsFormatted = countries
    //     .reduce(
    //         (res, country) => {
    //             if (!res[1].includes(country.continentCode)) {
    //                 res[1].push(country.continentCode);
    //                 res[0].push(country);
    //             }
    //             return res;
    //         },
    //         [[], []]
    //     )[0]
    //     .map((country: any) => {
    //         return {
    //             label: country.continentName,
    //             value: country.continentCode,
    //         };
    //     });

    // async function uploadVendor() {
    //     const variables = {
    //         name: nameValue,
    //         country: `${continentValue.value}-${countryValue.value}`,
    //         logoUrl: logoUrlValue,
    //         url: urlValue,
    //         socials,
    //     };
    //     console.log('new vendor...', variables);
    //     // const result = await addVendor({ variables });
    //     // console.log({ result });
    //     reset();
    // }

    // function reset() {
    //     setName('');
    //     setCountry('');
    //     setLogoInput('');
    //     setUrl('');
    //     setSocials([]);

    //     setShouldReset(true);
    //     setTimeout(() => {
    //         setShouldReset(false);
    //     });
    // }

    // // return null;
    // return (
    //     <div className="container upload">
    //         <Heading mainTitle="By adding yourself as a vendor" subTitle="Make yourself famous!" left />

    //         <div className="grid-container">
    //             <div className="column">
    //                 {nameInput}

    //                 <Multiselect
    //                     label="Continent"
    //                     onChange={(selectedContinent: any) => setContinent(selectedContinent)}
    //                     options={continentsFormatted}
    //                     defaultValue={{ label: 'Europe', value: 'EU' }}
    //                 />

    //                 <Multiselect
    //                     label="Country"
    //                     onChange={(selectedCountry: any) => setCountry(selectedCountry)}
    //                     options={countriesFormatted}
    //                     defaultValue={{ label: 'Netherlands', value: 'NL' }}
    //                 />

    //                 {logoUrlInput}
    //                 {urlInput}
    //                 <MultipleInputs
    //                     label="Social links..."
    //                     onChange={(socials: string[]) => {
    //                         setSocials(socials);
    //                     }}
    //                     shouldReset={shouldReset}
    //                 />

    //                 <Button onClick={uploadVendor} variant="primary" size="sm" className="align-right">
    //                     {loading ? 'Adding...' : 'Add vendor'}
    //                 </Button>
    //             </div>
    //         </div>
    //     </div>
    // );
}

// commenting this as it's not working, need to fix asap.
// export async function getServerSideProps() {
//     const filepath = process.cwd() + '/assets/countries.json';
//     const fileContents = fs.readFileSync(filepath, 'utf8')
//     const countries = JSON.parse(fileContents);
//     return {
//         props: {
//             countries: countriesFormatted,
//             continents: continentsFormatted
//         }
//     }
// }

export default withGA('UA-115865530-2', Router)(UploadVendor);
