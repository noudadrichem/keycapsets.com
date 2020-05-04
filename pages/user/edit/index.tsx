import React, { useContext } from 'react';
import withGA from 'next-ga';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

import Heading from '../../../components/Heading';
import { Context } from 'typings';
import context from '../../../context';

interface UserEditProps {}

type EditProfileInputs = {
    example: string;
    exampleRequired: string;
};

function UserEdit(props: UserEditProps): JSX.Element {
    const { state } = useContext<Context>(context);
    const { register, handleSubmit, watch, errors } = useForm<EditProfileInputs>();
    function onSubmit(data: any) {
        console.log(data);
    }

    return (
        <div className="container">
            <Heading mainTitle={`Edit my profile`} subTitle="" left />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="example" defaultValue="test" ref={register} />

                <input name="exampleRequired" ref={register({ required: true })} />

                <input className="btn primary sm" type="submit" />
            </form>

            <pre>{JSON.stringify(state.user, null, 4)}</pre>
        </div>
    );
}

export default withGA('UA-115865530-2', Router)(UserEdit);
