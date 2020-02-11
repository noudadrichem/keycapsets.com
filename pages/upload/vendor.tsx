import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import '../../assets/styles/main.scss';
import { CREATE_VENDOR_MUTATION } from '../../queries';

import useInput from '../../hooks/useInput';
import withData from '../../hooks/withData';

import MultipleInputs from '../../components/MultipleInputs'
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

interface UploadVendorProps { }

function UploadVendor(props: UploadVendorProps) {
    const [nameValue, nameInput] = useInput({ label: 'Name:'});
    const [countryValue, countryInput] = useInput({ label: 'Country:'});
    const [logoUrlValue, logoUrlInput] = useInput({ label: 'Logo url:'});
    const [urlValue, urlInput] = useInput({ label: 'Website address:'});
    const [socials, setSocials] = useState([])

    const [addVendor, mutationResponse] = useMutation(CREATE_VENDOR_MUTATION);
    async function uploadVendor() {
        const variables = {
            name: nameValue,
            country: countryValue,
            logoUrl: logoUrlValue,
            url: urlValue,
            socials
        };

       const result = await addVendor({ variables });
       console.log('result', result)
    }

    return (
        <>
            <Nav />
            <div className="container upload">
                <Heading mainTitle="Are you a vendor" subTitle="Make yourself famous!" left />

                <div className="grid-container">
                    <div className="column">
                        {nameInput}
                        {countryInput}
                        {logoUrlInput}
                        {urlInput}
                        <MultipleInputs label="Social links..." onChange={(socials: string[]) => setSocials(socials)} />

                        <Button
                            onClick={uploadVendor}
                            variant="primary"
                            size="sm"
                            className="align-right"
                            >
                            Add vendor
                        </Button>
                    </div>
                </div>


                <Footer />
            </div>
        </>
    )
}

export default withData(UploadVendor);
