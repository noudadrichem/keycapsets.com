import React, { useContext } from 'react';
import withGA from 'next-ga';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

import '../../assets/styles/main.scss';

import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Meta from '../../components/Meta';
import withData from '../../hooks/withData';
import useMe from '../../hooks/useMe';
import { Context } from 'typings';
import context from '../../context';

interface UserEditProps {}

type EditProfileInputs = {
    example: string;
    exampleRequired: string;
};

function UserEdit(props: UserEditProps) {
    const { state } = useContext<Context>(context);
    const { register, handleSubmit, watch, errors } = useForm<EditProfileInputs>();
    function onSubmit(data: any) {
        console.log(data);
    }

    return (
        <>
            <Meta />

            <Nav />
            <div className="container">
                <Heading mainTitle={`Edit my profile`} subTitle="" left />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="example" defaultValue="test" ref={register} />

                    <input name="exampleRequired" ref={register({ required: true })} />

                    <input className="btn primary sm" type="submit" />
                </form>

                <pre>{JSON.stringify(state.user, null, 4)}</pre>
            </div>
            <Footer />
        </>
    );
}

export default withGA('UA-115865530-2', Router)(withData(UserEdit));
