import React, { useContext, useState, useEffect } from 'react';
import withGA from 'next-ga';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { ApolloClient } from 'apollo-boost';
import { Context } from 'typings';

import context from '../../../context';
import { Input } from '../../../hooks/useInput';
// import countries from '../../../assets/countries';

import Heading from '../../../components/Heading';
// import Multiselect from '../../../components/Multiselect';
import Button from '../../../components/Button';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from '../../../queries';

interface UserEditProps {}

type EditProfileInputs = {
    name: string;
    email: string;
    geekhackUserName: string;
    redditUserName: string;
};

// const countriesFormatted: any[] = countries.map((country: any) => {
//     return {
//         label: country.countryName,
//         value: country.twoLetterCountryCode,
//     };
// });

function UserEdit(props: UserEditProps): JSX.Element {
    const { state } = useContext<Context>(context);
    // const [country, setCountry] = useState<any>();
    const { register, handleSubmit, errors } = useForm<EditProfileInputs>();
    const [updateUserMutation] = useMutation(UPDATE_USER);

    async function updateUser(formValues: any) {
        const response = await updateUserMutation({
            variables: {
                input: {
                    _id: state.user._id,
                    ...formValues,
                    /**
                     *  _id: ID!
                        name: String
                        email: String
                        geekhackUserName: String
                        redditUserName: String
                     */
                },
            },
        });
        console.log('response...', response);
    }

    useEffect(function initialRender() {}, []);

    useEffect(
        function handleFormErrors() {
            console.log('errors', errors);
        },
        [errors]
    );

    return (
        state.user !== undefined && (
            <div className="container user edit">
                <Heading
                    mainTitle={`Setup your profile...`}
                    subTitle={`Hee, ${state.user.isVendor ? 'Vendor' : state.user.isDesigner ? 'Designer' : ''} ${
                        state.user.name
                    }`}
                    left
                />

                <div className="grid two-column">
                    <div className="column">
                        <form onSubmit={handleSubmit(updateUser)}>
                            <Input
                                id="name"
                                label="Full name"
                                reference={register({ required: true })}
                                defaultValue={state.user.name}
                                className={errors.name ? 'invalid' : ''}
                            />

                            <Input
                                id="email"
                                label="Email address"
                                reference={register({
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Email address is invalid',
                                    },
                                })}
                                defaultValue={state.user.email}
                                className={errors.email ? 'invalid' : ''}
                            />

                            <Input
                                id="geekhackUserName"
                                label="Your Geekhack username"
                                reference={register}
                                defaultValue={state.user.geekhackUserName}
                            />
                            <Input
                                id="redditUserName"
                                label="Your Reddit username"
                                reference={register}
                                defaultValue={state.user.redditUserName}
                            />

                            {/* <Multiselect
                            label="Country"
                            onChange={(selectedCountry: any) => setCountry(selectedCountry)}
                            options={countriesFormatted}
                            defaultValue={{ label: 'Netherlands', value: 'NL' }}
                        /> */}

                            <button className="btn secondary md" type="submit">
                                Update profile
                            </button>
                        </form>
                    </div>

                    <div className="column cards vertical">
                        <div className="card center">
                            <h4>Are you a keycapset designer?</h4>
                            <Button onClick={() => console.log('sign up as designer')} variant="primary" size="sm">
                                Get the designer role
                            </Button>
                        </div>

                        <div className="card center">
                            <h4>Are you a vendor?</h4>
                            <Button
                                onClick={() => console.log('sign up as vendordesigner')}
                                variant="primary"
                                size="sm"
                            >
                                Get the vendor role
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

UserEdit.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(UserEdit);
