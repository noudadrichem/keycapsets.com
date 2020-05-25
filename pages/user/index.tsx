import { Router } from 'next/router';
import withGA from 'next-ga';
import { useQuery } from '@apollo/react-hooks';
import { USER_WANTS_SETS } from '../../queries';
import Heading from '../../components/Heading';
import LoadingKeyboardIllustration from '../../components/LoadingKeyboardIllustration';
import Images from '../../components/Images';
import { useContext, useEffect } from 'react';
import { Context } from 'typings';
import context from '../../context';

function User() {
    const { data, loading, error } = useQuery(USER_WANTS_SETS);
    const { state, dispatch } = useContext<Context>(context);

    useEffect(() => {
        if (!loading) {
            dispatch({
                type: 'set',
                payload: {
                    userWants: data.userWantsSets.map(({ _id }) => _id),
                },
            });
        }
    }, [data]);

    return (
        state.user !== undefined && (
            <div className="container large">
                <Heading
                    mainTitle="Your overview of your favorite keycapsets"
                    subTitle={`Hee, ${state.user.name}.`}
                    left
                />
                {loading ? <LoadingKeyboardIllustration /> : <Images keycapsets={data.userWantsSets} />}
            </div>
        )
    );
}

User.getInitialProps = () => {
    return {
        isLargeContainer: true,
    };
};
export default withGA('UA-115865530-2', Router)(User);
