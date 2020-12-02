import React from 'react';

function Layout1(props: any) {
    return (
        <div id="layout poseidon">
            <h1>Layout1</h1>
            {props.children}
        </div>
    );
}

export default Layout1;
