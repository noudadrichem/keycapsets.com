import React, { useContext, useState, useEffect } from 'react';
import withGA from 'next-ga';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { Context } from 'typings';
import { useMutation } from '@apollo/react-hooks';
import ReactTooltip from 'react-tooltip';

import context from '../../../context';
import { Input } from '../../../hooks/useInput';

import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import { UPDATE_USER, REQUEST_DESIGNER_ROLE, REQUEST_VENDOR_ROLE } from '../../../queries';
import Link from 'next/link';
import ButtonLink from '../../../components/ButtonLink';

interface UserEditProps {}

type EditProfileInputs = {
    name: string;
    email: string;
    geekhackUserName: string;
    redditUserName: string;
};

function UserEdit(props: UserEditProps): JSX.Element {
    const { state, dispatch } = useContext<Context>(context);
    const { register, handleSubmit, errors } = useForm<EditProfileInputs>();
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [updateUserMutation] = useMutation(UPDATE_USER);
    const [requestDesignerRole] = useMutation<any>(REQUEST_DESIGNER_ROLE);

    async function updateUser(formValues: any) {
        try {
            const response = await updateUserMutation({
                variables: {
                    input: {
                        _id: state.user._id,
                        ...formValues,
                    },
                },
            });
            console.log('response...', response);
            setIsUpdated(true);
            setTimeout(() => {
                setIsUpdated(false);
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    }

    async function signUpAsDesigner() {
        try {
            const response = await requestDesignerRole();
            console.log('sign up as designer...', response.data);
            dispatch({
                type: 'set',
                payload: {
                    user: {
                        ...state.user,
                        isDesigner: true,
                    },
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function signUpAsVendor() {
        console.log('email me for info...');
    }

    useEffect(
        function handleFormErrors() {
            console.log('errors', errors);
        },
        [errors]
    );

    return (
        <div className="container user edit">
            {state.user !== undefined ? (
                <>
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

                                <button className="btn secondary md" type="submit">
                                    {isUpdated ? 'Succesfully updated' : 'Update profile'}
                                </button>
                            </form>
                        </div>

                        <div className="column cards vertical">
                            <div className="card center">
                                <h4>Are you a keycapset designer?</h4>
                                <Button
                                    onClick={signUpAsDesigner}
                                    variant="primary"
                                    size="sm"
                                    isDisabled={state.user.isDesigner}
                                >
                                    {state.user.isDesigner ? 'You are' : 'Get the designer role'}
                                </Button>
                            </div>

                            <div className="card center">
                                <h4>Are you a vendor?</h4>
                                <Button onClick={signUpAsVendor} variant="primary" size="sm" isDisabled>
                                    <span data-tip="Email me for more info">Get the vendor role(coming soon)</span>
                                </Button>
                            </div>
                            <ReactTooltip place="bottom" delayHide={500} className="tooltip" effect="solid" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Heading mainTitle={`You're not logged in...`} subTitle={`Setup your profile...`} />
                    <ButtonLink center isLarge href="/login">
                        Go to login page
                    </ButtonLink>
                </>
            )}
        </div>
    );
}

UserEdit.getInitialProps = () => {
    return {
        isLargeContainer: false,
    };
};

export default withGA('UA-115865530-2', Router)(UserEdit);
