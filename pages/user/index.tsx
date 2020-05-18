import { Router } from 'next/router';
import withGA from 'next-ga';

function User() {
    return <div>User!!</div>;
}

export default withGA('UA-115865530-2', Router)(User);
