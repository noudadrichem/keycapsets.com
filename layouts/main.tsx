import { useContext, useEffect } from 'react';
import { Context } from 'typings';
import { useQuery } from '@apollo/react-hooks';

import context from '../context';
import { ME } from '../queries';

interface MainLayoutProps {
    children: any;
}

function MainLayout(props: MainLayoutProps) {
    const { dispatch } = useContext<Context>(context);
    const { data: me, loading } = useQuery(ME);
    const { children } = props;

    useEffect(() => {
        if (!loading) {
            dispatch({
                type: 'user',
                payload: {
                    user: me.me,
                },
            });
        }
    }, [me]);

    useEffect(() => {
        console.log();
    }, []);

    return (
        <>
            <div className="page-layout">{children}</div>
        </>
    );
}

export default MainLayout;
