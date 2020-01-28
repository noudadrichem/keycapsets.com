import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Heading from '../components/Heading';
import useInput from '../hooks/useInput';
import withData from '../hooks/withData';

import '../assets/styles/main.scss';
import Button from '../components/Button';

const CREATE_KEYSET_MUTATION = gql`
mutation keycapsetCreateOne {
    keycapsetCreateOne(record: {
      name: $name
      type: $type
      active: $active
      coverImageUrl: $coverImageUrl
    }) {
      record {
        name
        type
        active
        coverImageUrl
      }
    }
}`

interface UploadProps {}

function Upload(props: UploadProps): JSX.Element {
    const [nameValue, nameInput] = useInput({ label: 'Name:', defaultValue: 'Test entry' });
    const [typeValue, typeInput] = useInput({ label: 'Type:', placeholder: 'gmk, xda, e-pbt, sa, etc...', defaultValue: 'xda'});
    const [coverImageUrlValue, coverImageUrlInput] = useInput({ label: 'Cover image (url):', defaultValue: 'Test entry'});
    const [websiteUrlValue, websiteUrlInput] = useInput({ label: 'Website:', defaultValue: 'Test entry'});
    const [startDateValue, startDateInput] = useInput({ label: 'Start groupbuy:', type: 'date' });
    const [endDateValue, endDateInput] = useInput({ label: 'End groupbuy:', type: 'date' });

    const [addKeyset, { data }] = useMutation(CREATE_KEYSET_MUTATION);

    function upload(e) {
        const variables = {
            name: nameValue,
            type: typeValue,
            active: false,
            coverImageUrl: coverImageUrlValue
        };

        console.log('mutation...', data, variables);
        addKeyset({variables });
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
            </div>

            <Button
                onClick={upload}
                variant="primary"
                size="sm"
                className='primary'
            >
                Request
            </Button>
        </>
    )
}

export default withData(Upload);
