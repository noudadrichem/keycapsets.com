import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Heading from '../../components/Heading';
import useInput from '../../hooks/useInput';
import withData from '../../hooks/withData';
import MultipleInputs from '../../components/MultipleInputs';
import Select from '../../components/Select';

import '../../assets/styles/main.scss';
import Button from '../../components/Button';

const CREATE_KEYSET_MUTATION = gql`
mutation keycapsetCreateOne(
    $name: String
    $type: String
    $active: Boolean
    $coverImageUrl: String
    $vendors: [String]
    $imageUrls: [String]
    $websiteUrl: String
    $groupbuyStartDate: Date
    $groupbuyEndDate: Date
) {
    createKeycapset(
        name: $name
        type: $type
        active: $active
        coverImageUrl: $coverImageUrl,
        vendors: $vendors
        imageUrls: $imageUrls
        websiteUrl: $websiteUrl
        groupbuyStartDate: $groupbuyStartDate
        groupbuyEndDate: $groupbuyEndDate
    ) {
        name
        type
        _id
    }
}
`

const GET_VENDOR_QUERY = gql`
query GET_VENDOR_QUERY {
  vendors {
    name
    _id
  }
}
`

interface UploadSetProps {}

function UploadSet(props: UploadSetProps): JSX.Element {
    const [nameValue, nameInput] = useInput({ label: 'Name:', defaultValue: 'Test entry' });
    const [typeValue, typeInput] = useInput({ label: 'Type:', placeholder: 'gmk, xda, e-pbt, sa, etc...', defaultValue: 'xda'});
    const [coverImageUrlValue, coverImageUrlInput] = useInput({ label: 'Cover image (url):', defaultValue: 'Test entry'});
    const [websiteUrlValue, websiteUrlInput] = useInput({ label: 'Website:', defaultValue: 'Test entry'});
    const [startDateValue, startDateInput] = useInput({ label: 'Start groupbuy:', type: 'date' });
    const [endDateValue, endDateInput] = useInput({ label: 'End groupbuy:', type: 'date' });

    const [imageUrls, setImageUrls] = useState([])
    const [vendors, setVendors] = useState([])

    const [addKeyset, mutationResponse] = useMutation(CREATE_KEYSET_MUTATION);
    const { loading, error, data: vendorQueryResult } = useQuery(GET_VENDOR_QUERY);


    function uploadKeycapset(e) {
        const variables = {
            name: nameValue,
            type: typeValue,
            active: false,
            coverImageUrl: coverImageUrlValue,
            websiteUrl: websiteUrlValue,
            groupbuyStartDate: startDateValue,
            groupbuyEndDate: endDateValue,
            imageUrls,
            vendors
        };

        addKeyset({ variables });
        console.log({ mutationResponse})
    }

    if(loading || error ) {
        return <div>loading or error</div>
    }

    return (
        <>
            <Heading mainTitle="keycapsets.com" subTitle="Make your keycap wishes come true" />

            <div className="container">
                { nameInput }
                { typeInput }
                { coverImageUrlInput }
                { websiteUrlInput }
                { startDateInput }
                { endDateInput }
                <MultipleInputs onChange={(values) => setImageUrls(values)} />
                <Select onSelectChange={(selectedVendors) => setVendors(selectedVendors) } values={vendorQueryResult.vendors} />
            </div>

            <Button
                onClick={uploadKeycapset}
                variant="primary"
                size="sm"
                className='primary'
            >
                Start shining
            </Button>
        </>
    )
}

export default withData(UploadSet);
