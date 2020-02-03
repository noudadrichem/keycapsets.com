import React, { useEffect, useState } from 'react';

import '../../assets/styles/main.scss';
import useInput from '../../hooks/useInput';
import withData from '../../hooks/withData';

import MultipleInputs from '../../components/MultipleInputs'
import { gql } from 'apollo-boost';
import Button from '../../components/Button';
import { useMutation } from '@apollo/react-hooks';
import Heading from '../../components/Heading';

const CREATE_VENDOR_MUTATION = gql`
mutation CREATE_VENDOR_MUTATION(
  $name: String,
  $country: String,
  $logoUrl: String,
  $socials: [String],
  $url: String
) {
    createVendor(
      name: $name,
      country: $country,
      logoUrl: $logoUrl,
      socials: $socials,
      url: $url
    ) {
        name
        _id
    }
}`

interface UploadVendorProps { }

function UploadVendor(props: UploadVendorProps) {
    const [nameValue, nameInput] = useInput({ label: 'Name:', defaultValue: 'Test entry' });
    const [countryValue, countryInput] = useInput({ label: 'Country:', defaultValue: 'Test entry' });
    const [logoUrlValue, logoUrlInput] = useInput({ label: 'Name:', defaultValue: 'Test entry' });
    const [urlValue, urlInput] = useInput({ label: 'Name:', defaultValue: 'Test entry' });
    const [socials, setSocials] = useState([])

    const [addKeyset, mutationResponse] = useMutation(CREATE_VENDOR_MUTATION);
    function uploadVendor() {
        const variables = {
            name: nameValue,
            country: countryValue,
            logoUrl: logoUrlValue,
            url: urlValue,
            socials
        };

        addKeyset({ variables });
        console.log({mutationResponse})
    }

    return (
        <div className="container">

            <Heading mainTitle="Are you a vendor" subTitle="Make yourself famous!" left />

            {nameInput}
            {countryInput}
            {logoUrlInput}
            {urlInput}
            <MultipleInputs onChange={(socials: string[]) => setSocials(socials)} />

            <Button
                onClick={uploadVendor}
                variant="primary"
                size="sm"
                className='primary'
            >
                Upload
            </Button>
        </div>
    )
}

export default withData(UploadVendor);
