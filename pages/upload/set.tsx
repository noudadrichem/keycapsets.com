import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import withGA from 'next-ga';
import Router from 'next/router';
import { Keycapset, Vendor } from '../../types/types';
import { ExecutionResult } from 'graphql';
// import ColorPicker from 'rc-color-picker';

import 'rc-color-picker/assets/index.css';

import { CREATE_KEYSET_MUTATION, GET_VENDORS_QUERY } from '../../queries';
import { PROFILE_OPTIONS, BRAND_OPTIONS, MATERIAL_OPTIONS } from '../../constants';

import useInput from '../../hooks/useInput';

import Heading from '../../components/Heading';
import MultipleInputs from '../../components/MultipleInputs';
import Button from '../../components/Button';
import Multiselect from '../../components/Multiselect';
import LoadingKeyboard from '../../components/LoadingKeyboard';
import ColorPicker from '../../components/ColorPicker';
import Checkbox from '../../components/Checkbox';
import ImageCard from '../../components/ImageCard';

interface UploadSetProps {}

function UploadSet(): JSX.Element {
    return null;
    // const [nameValue, nameInput, setName] = useInput({ label: 'Name:' });
    // const [designerNameValue, designerNameInput] = useInput({
    //     label: 'Designer name:',
    // });
    // const [coverImageUrlValue, coverImageUrlInput, setCoverImg] = useInput({
    //     label: 'Cover image (url):',
    // });
    // const [websiteUrlValue, websiteUrlInput, setWebsiteUrlInput] = useInput({
    //     label: 'Website (or Geekhack):',
    // });
    // const [startDateValue, startDateInput, setStartDate] = useInput({
    //     label: 'Start groupbuy:',
    //     type: 'date',
    //     defaultValue: moment().format('YYYY-MM-DD'),
    // });
    // const [endDateValue, endDateInput, setEndDateValue] = useInput({
    //     label: 'End groupbuy:',
    //     type: 'date',
    //     defaultValue: moment().add('1', 'months').format('YYYY-MM-DD'),
    // });

    // const [accentColor1Value, , setAccentColor1] = useInput({
    //     label: 'Page accent color 1:',
    // });
    // const [accentColor2Value, , setAccentColor2] = useInput({
    //     label: 'Page accent color 2:',
    // });
    // const [accentColor3Value, , setAccentColor3] = useInput({
    //     label: 'Page accent color 3:',
    // });
    // // const [isInterestCheckValue, isInterestCheckInput] = useInput({ label: 'Is this an interest check?', type: 'checkbox'})
    // // kits here...
    // const [imageUrls, setImageUrls] = useState([]);
    // const [vendors, setVendors] = useState([]);
    // const [type, setType] = useState(PROFILE_OPTIONS[0]);
    // const [brand, setBrand] = useState(BRAND_OPTIONS[0]);
    // const [material, setMaterial] = useState(MATERIAL_OPTIONS[0]);
    // const [uploading, setUploading] = useState(false);
    // const [shouldReset, setShouldReset] = useState(false);
    // const [isFormValid, setFormValid] = useState(true);
    // const [] = useState([]);
    // const [isInterestCheckValue, setIsInterestCheckValue] = useState<boolean>(false);

    // const [addKeyset] = useMutation(CREATE_KEYSET_MUTATION);
    // const { loading, error, data: vendorQueryResult } = useQuery(GET_VENDORS_QUERY);

    // const keycapset: Keycapset = {
    //     name: nameValue,
    //     coverImageUrl: coverImageUrlValue,
    //     websiteUrl: websiteUrlValue,
    //     groupbuyStartDate: startDateValue,
    //     groupbuyEndDate: endDateValue,
    //     designerName: designerNameValue,
    //     accentColor1: accentColor1Value,
    //     accentColor2: accentColor2Value,
    //     accentColor3: accentColor3Value,
    //     isInterestCheck: isInterestCheckValue || false, // update input hook
    //     kits: [],
    //     imageUrls,
    // };

    // useEffect(() => {
    //     const oneMonthLater = moment(startDateValue).add(1, 'months').add(1, 'days').format('YYYY-MM-DD');
    //     setEndDateValue(oneMonthLater);
    // }, [startDateValue]);

    // async function uploadKeycapset() {
    //     const multiSelectedValues = {
    //         type: type.value,
    //         brand: brand.value,
    //         material: material.value,
    //         vendors: !!vendors && vendors.map((v) => v.value),
    //     };

    //     const newKeycapset = {
    //         ...keycapset,
    //         ...multiSelectedValues,
    //     };

    //     // handleFormValidation();
    //     if (isFormValid) {
    //         setUploading(true);
    //         console.log('newKeycapset...', newKeycapset);
    //         setUploading(false);
    //         setFormValid(true);
    //         reset();
    //     } else {
    //         console.log('form is not valid...', { isFormValid });
    //     }
    // }

    // function isEmptyValue(val) {
    //     console.log('val..', val);
    //     console.log('val === []', val === []);
    //     const isEmpty = val === '' || val === undefined || val === null || val === [];

    //     return isEmpty;
    // }

    // function reset() {
    //     setName('');
    //     // setTypes(PROFILE_OPTIONS);
    //     // setBrands(BRAND_OPTIONS);
    //     // setMaterials(MATERIAL_OPTIONS);
    //     setCoverImg('');
    //     setWebsiteUrlInput('');
    //     setStartDate('2020-03-24');
    //     setEndDateValue('');
    //     setImageUrls([]);
    //     setVendors([]);
    //     setFormValid(false);
    //     setShouldReset(true);
    //     setTimeout(() => {
    //         setShouldReset(false);
    //     });
    // }

    // if (loading) {
    //     return <LoadingKeyboard />;
    // }

    // if (error) {
    //     console.error('error', error);
    //     return <p>'Error loading keycapsets.com... Please refresh this page'</p>;
    // }

    // return (
    //     <div className="container upload">
    //         <Heading mainTitle="Upload a keycapset" subTitle="Make your set famous!" left />

    //         <div className="grid two-column">
    //             <div className="column">
    //                 <h4 className="form-sub-title">Basis keycapset info</h4>
    //                 <Checkbox
    //                     label="Is this an interest check?"
    //                     checked={isInterestCheckValue}
    //                     getVal={(isChecked: boolean) => setIsInterestCheckValue(isChecked)}
    //                 />

    //                 {nameInput}
    //                 {designerNameInput}
    //                 {coverImageUrlInput}
    //                 {websiteUrlInput}

    //                 {!isInterestCheckValue && (
    //                     <>
    //                         {startDateInput}
    //                         {endDateInput}
    //                         <Multiselect
    //                             label="Vendors"
    //                             value={vendors}
    //                             onChange={(selectedVendors: any[]) => setVendors(selectedVendors)}
    //                             options={vendorQueryResult.vendors.map((v: Vendor) => ({
    //                                 value: v._id,
    //                                 label: v.name,
    //                             }))}
    //                             isMulti
    //                         />
    //                     </>
    //                 )}

    //                 <MultipleInputs
    //                     label="Images"
    //                     onChange={(values: string[]) => setImageUrls(values)}
    //                     shouldReset={shouldReset}
    //                 />

    //                 <div className="form-ruler" />

    //                 <h4 className="form-sub-title">Detailed keycapset info</h4>

    //                 <Multiselect
    //                     label="Brand"
    //                     onChange={(selectedbrand: any) => setBrand(selectedbrand)}
    //                     options={BRAND_OPTIONS}
    //                 />
    //                 <Multiselect
    //                     label="Profile"
    //                     onChange={(selectedProfile: any) => setType(selectedProfile)}
    //                     options={PROFILE_OPTIONS}
    //                 />
    //                 <Multiselect
    //                     label="Material"
    //                     onChange={(selectedMaterial: any) => setMaterial(selectedMaterial)}
    //                     options={MATERIAL_OPTIONS}
    //                 />

    //                 <div className="form-ruler" />

    //                 <h4 className="form-sub-title">Keycapset kits (coming soon!)</h4>

    //                 <div className="form-ruler" />

    //                 <h4 className="form-sub-title">Single page details (Coming soon!)</h4>
    //                 {/* <p className="small light">These values will make it possible to upload you own color accents to create a 'themed' single page for your keyset! </p> */}
    //                 <ColorPicker label="Background color" defaultValue="#F8F9FB" onChange={(c) => setAccentColor1(c)} />
    //                 <ColorPicker
    //                     label="Call to action color"
    //                     defaultValue="#539BFB"
    //                     onChange={(c) => setAccentColor2(c)}
    //                 />
    //                 <ColorPicker label="Text color" defaultValue="#566073" onChange={(c) => setAccentColor3(c)} />

    //                 <Button
    //                     onClick={uploadKeycapset}
    //                     variant="primary"
    //                     size="sm"
    //                     className="align-right"
    //                     // isDisabled={!isFormValid}
    //                 >
    //                     {uploading ? 'Uploading...' : 'Start shining'}
    //                 </Button>
    //             </div>

    //             <div className="column">
    //                 <h4>Your keyset will look like this.</h4>
    //                 <ImageCard {...{ keycapset }} />
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default withGA('UA-115865530-2', Router)(UploadSet);
