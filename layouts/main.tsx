import { useContext, useEffect } from 'react';
import { Context } from '../types/interfaces';
import { useQuery } from '@apollo/react-hooks';

// import context from '../context';
import { ME } from '../queries';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
    // const { data: me, loading } = useQuery(ME);
    const { children } = props;

    return (
        <>
            <div className="page-layout">{children}</div>
        </>
    );
}

export default MainLayout;
