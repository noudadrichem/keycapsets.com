import React, { useEffect, useState } from 'react';
import Context, { INITITAL_STATE, reduceState } from '../context';

import Heading from '../components/Heading';

import '../assets/styles/main.scss';

interface UploadProps {}

function Upload(props: UploadProps): JSX.Element {
    useEffect(() => { }, []);

    return (
        <div className="upload-page">
            <Heading mainTitle="Upload your set" subTitle="Share your set and make it famous!" />
            upload
        </div>
    )
}

export default Upload;


const createKeycapsetMutation = `
mutation keycapsetCreateOne {
    keycapsetCreateOne(record: {
      name: "Perestroika",
      type: "GMK",
      active: false,
      coverImageUrl: "https://gmk-perestroika.com/"
    }) {
      record {
        name
        type
        active
        coverImageUrl
      }
    }
}
`
