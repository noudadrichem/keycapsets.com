import React, { useEffect } from 'react';
import Link from 'next/link';
import withGA from 'next-ga';
import Router from 'next/router';
import '../../assets/styles/upload.scss';

import Heading from '../../components/Heading';
import { useMutation } from '@apollo/client';
import { IMG_UPLOAD_FORM_DATA } from '../../queries';

interface UploadProps {}

function Upload(props: UploadProps) {
    const [uploadFile] = useMutation(IMG_UPLOAD_FORM_DATA);

    // async function moetje(evt) {
    //     const file = evt.target.files[0];
    //     try {
    //         const response = await uploadFile({ variables: { file } });
    //         console.log('file upload response', response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    {
        /* <input type="file" onChange={moetje} /> */
    }

    return (
        <div className="container upload">
            {/* <Heading mainTitle="Upload a set or apply as a vendor!" subTitle="Start shining out there!" left /> */}

            <div className="cards">
                <div className="card">
                    <Link href="/upload/set">Add a set!</Link>
                </div>

                <div className="card">
                    <Link href="/upload/vendor">Are you a vendor?</Link>
                </div>
            </div>
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(Upload);
