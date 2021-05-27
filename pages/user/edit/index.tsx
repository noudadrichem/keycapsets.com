import React, { useContext, useState, useEffect } from 'react';
import withGA from 'next-ga';
import Router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Context } from '../../../types/interfaces';
import { useMutation } from '@apollo/client';
import ReactTooltip from 'react-tooltip';

import context from '../../../context';
import { Input } from '../../../hooks/useInput';

import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import { UPDATE_USER, REQUEST_DESIGNER_ROLE, REQUEST_VENDOR_ROLE } from '../../../queries';
import Link from 'next/link';
import ButtonLink from '../../../components/ButtonLink';
import useStore from '../../../context';

interface UserEditProps {}

type EditProfileInputs = {
    name: string;
    email: string;
    geekhackUserName: string;
    redditUserName: string;
};

function UserEdit(props: UserEditProps): JSX.Element {
    const { register, handleSubmit, errors } = useForm<EditProfileInputs>();
    const [updateUserMutation] = useMutation(UPDATE_USER);
    const [requestDesignerRole] = useMutation(REQUEST_DESIGNER_ROLE);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const user = useStore((state) => state.user);

    async function updateUser(formValues: { name: string; email: string }) {
        try {
            const response = await updateUserMutation({
                variables: {
                    input: {
                        _id: user._id,
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
            {user !== null ? (
                <>
                    <Heading
                        mainTitle={`Edit your profile...`}
                        subTitle={`Hi, ${user.isVendor ? 'Vendor' : user.isDesigner ? 'Designer' : ''} ${user.name}`}
                        left
                    />
                    <div className="grid two-column">
                        <div className="column">
                            <form onSubmit={handleSubmit(updateUser)}>
                                <Input
                                    id="name"
                                    label="Full name"
                                    reference={register({ required: true })}
                                    defaultValue={user.name}
                                    className={errors.name ? 'invalid' : ''}
                                />

                                <Input
                                    id="email"
                                    label="Email address"
                                    type="email"
                                    reference={register({
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Email address is invalid',
                                        },
                                    })}
                                    defaultValue={user.email}
                                    className={errors.email ? 'invalid' : ''}
                                />

                                <Input
                                    id="geekhackUserName"
                                    label="Your Geekhack username"
                                    reference={register}
                                    defaultValue={user.geekhackUserName}
                                />
                                <Input
                                    id="redditUserName"
                                    label="Your Reddit username"
                                    reference={register}
                                    defaultValue={user.redditUserName}
                                />

                                <button className="btn secondary md" type="submit">
                                    {isUpdated ? 'Succesfully updated' : 'Update profile'}
                                </button>
                            </form>
                        </div>

                        <div className="column cards vertical">
                            <div className="card center">
                                <h4>Are you a keycapset designer?</h4>
                                <Button onClick={signUpAsDesigner} variant="primary" size="sm" isDisabled={user.isDesigner}>
                                    {user.isDesigner ? 'You are' : 'Get the designer role'}
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
