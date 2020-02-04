import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { CREATE_KEYSET_MUTATION, GET_VENDORS_QUERY } from '../../queries';

import useInput from '../../hooks/useInput';
import withData from '../../hooks/withData';

import Heading from '../../components/Heading';
import MultipleInputs from '../../components/MultipleInputs';
import Select from '../../components/Select';
import Button from '../../components/Button';

import '../../assets/styles/main.scss';
import { Keycapset } from 'typings';
import { ExecutionResult } from 'graphql';

interface UploadSetProps {}

function UploadSet(props: UploadSetProps): JSX.Element {
    const [nameValue, nameInput] = useInput({ label: 'Name:' });
    const [typeValue, typeInput] = useInput({ label: 'Type:', placeholder: 'gmk, xda, e-pbt, sa...', defaultValue: 'gmk'});
    const [coverImageUrlValue, coverImageUrlInput] = useInput({ label: 'Cover image (url):' });
    const [websiteUrlValue, websiteUrlInput] = useInput({ label: 'Website:' });
    const [startDateValue, startDateInput] = useInput({ label: 'Start groupbuy:', type: 'date', defaultValue: moment().format('YYYY-MM-DD') });
    const [endDateValue, endDateInput] = useInput({ label: 'End groupbuy:', type: 'date', defaultValue: moment().add('1', 'months').format('YYYY-MM-DD') });

    const [imageUrls, setImageUrls] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [addKeyset] = useMutation(CREATE_KEYSET_MUTATION);
    const { loading, error, data: vendorQueryResult } = useQuery(GET_VENDORS_QUERY);

    async function uploadKeycapset(e) {
        setUploading(true);
        const variables: Keycapset = {
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

        const result: ExecutionResult<Keycapset> = await addKeyset({ variables });
        setUploading(false)
        console.log({ result })
    }

    if(loading || error ) {
        return <div>loading or error</div>
    }

    return (
        <div className="container">
            <Heading mainTitle="Upload your set" subTitle="And make it famous!" left />
            { nameInput }
            { typeInput }
            { coverImageUrlInput }
            { websiteUrlInput }
            { startDateInput }
            { endDateInput }
            <Select label="Vendors" onSelectChange={(selectedVendors: string[]) => setVendors(selectedVendors) } values={vendorQueryResult.vendors} />
            <MultipleInputs label="Images" onChange={(values: string[]) => setImageUrls(values)} />

            <Button
                onClick={uploadKeycapset}
                variant="primary"
                size="sm"
                className="align-right"
            >
                { uploading ? 'Uploading...' : 'Start shining' }
            </Button>
        </div>
    )
}

export default withData(UploadSet);
