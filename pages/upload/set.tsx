import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { CREATE_KEYSET_MUTATION, GET_VENDORS_QUERY } from '../../queries';

import useInput from '../../hooks/useInput';
import withData from '../../hooks/withData';

import Heading from '../../components/Heading';
import MultipleInputs from '../../components/MultipleInputs';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Multiselect from '../../components/Multiselect';

import '../../assets/styles/main.scss';
import { Keycapset, Vendor } from 'typings';
import { ExecutionResult } from 'graphql';
import Nav from '../../components/Nav';
import ImageCard from '../../components/ImageCard';
import LoadingKeyboard from '../../components/LoadingKeyboard';

interface UploadSetProps {}

function UploadSet(props: UploadSetProps): JSX.Element {
    const [nameValue, nameInput] = useInput({ label: 'Name:' });
    const [typeValue, typeInput] = useInput({ label: 'Type:', placeholder: 'gmk, xda, e-pbt, sa...', defaultValue: 'gmk'});
    const [coverImageUrlValue, coverImageUrlInput] = useInput({ label: 'Cover image (url):' });
    const [websiteUrlValue, websiteUrlInput] = useInput({ label: 'Website:' });
    const [startDateValue, startDateInput] = useInput({ label: 'Start groupbuy:', type: 'date', defaultValue: moment().format('YYYY-MM-DD') });
    const [endDateValue, endDateInput, setEndDateValue] = useInput({ label: 'End groupbuy:', type: 'date', defaultValue: moment().add('1', 'months').format('YYYY-MM-DD') });

    const [imageUrls, setImageUrls] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [uploading, setUploading] = useState(false);

    const keycapset: Keycapset = {
        name: nameValue,
        type: typeValue,
        active: false,
        coverImageUrl: coverImageUrlValue,
        websiteUrl: websiteUrlValue,
        groupbuyStartDate: startDateValue,
        groupbuyEndDate: endDateValue,
        vendors: vendors.map((v) => v._id),
        imageUrls
    };

    const [addKeyset] = useMutation(CREATE_KEYSET_MUTATION);
    const { loading, error, data: vendorQueryResult } = useQuery(GET_VENDORS_QUERY);

    useEffect(() => {
        const oneMonthLater = moment(startDateValue).add(1, 'months').add(1, 'days').format('YYYY-MM-DD')
        setEndDateValue(oneMonthLater)
    }, [startDateValue])

    async function uploadKeycapset(e) {
        setUploading(true);

        const result: ExecutionResult<Keycapset> = await addKeyset({ variables: keycapset });
        setUploading(false)
        console.log({ result })
    }

    if (loading) {
        return <LoadingKeyboard />;
    }

    if (error) {
        return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    }

    return (
        <>
            <Nav />
            <div className="container upload">
                <Heading mainTitle="Upload your set" subTitle="And make it famous!" left />

                <div className="grid two-column">
                    <div className="column">
                        { nameInput }
                        { typeInput }
                        { coverImageUrlInput }
                        { websiteUrlInput }
                        { startDateInput }
                        { endDateInput }
                        <Multiselect
                            value={vendors}
                            onChange={(selectedVendors: any[]) => setVendors(selectedVendors)}
                            options={vendorQueryResult.vendors.map((v: Vendor) => ({ value: v._id, label: v.name }))}
                        />
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

                    <div className="column">
                        <h4>Your card will look like this.</h4>
                        <ImageCard {...{keycapset}} />
                    </div>

                </div>


                <Footer />
            </div>
        </>
    )
}

export default withData(UploadSet);
