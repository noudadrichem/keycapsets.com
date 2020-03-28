import React, { useEffect, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks'

import '../../assets/styles/main.scss';
import '../../assets/styles/input.scss';

import withData from '../../hooks/withData';
import { UPLOAD_FILE_STREAM } from '../../queries';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import FileInput from '../../components/FileInput';


// const SINGLE_UPLOAD_MUTATION = gql`
//   mutation imgUpload($file: Upload!) {
//   imgUpload(
//     file: $file
//   ) {
//     filename
//   }
// }
// `

function UploadImg() {
    const [uploadFileMutation] = useMutation(UPLOAD_FILE_STREAM)
    const [file, setFile] = useState();

    function setFileOnChange(files) {
        const file = files[0];
        setFile(file);
    }

    async function upload() {
        console.log('upload', file)

        const res = await uploadFileMutation({ variables: {
            file
        }})

        console.log(res)
    }

    return (
        <div>
            <Nav />

            <div className="container">
                <h1>Test upload img</h1>

                <FileInput label="upload file" onChange={setFileOnChange} />

                <button onClick={upload}>upload</button>

            </div>
            <Footer />
        </div>
    )
}

export default withData(UploadImg);
