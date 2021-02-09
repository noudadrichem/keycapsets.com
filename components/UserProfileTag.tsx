import { useContext, useState, useEffect, useRef, Ref } from 'react';
import { Context, InititalState } from '../types/interfaces';
// import context from '../context';
import Link from 'next/link';
import { logoutUser } from '../utils/user';
import useClickOutside from '../hooks/useClickOutside';
import useStore from '../context';

function UserProfileTag() {
    const [isPopoverShown, setIspopoverShown] = useState<boolean>(false);
    const popup = useRef<HTMLDivElement | null>();
    const user = useStore((state) => state.user);
    const isLoggedIn = useStore((state) => state.isLoggedIn);

    useClickOutside(popup, handleClickOutside);

    function logout() {
        logoutUser();
    }

    function handleClickOutside(e: React.MouseEvent<HTMLElement>) {
        setIspopoverShown(false);
    }

    return (
        isLoggedIn &&
        user !== null && (
            <div className="user-profile-tag">
                {
                    <div className="profile-tag-wrapper" onClick={() => setIspopoverShown(!isPopoverShown)}>
                        {user.avatar !== null ? (
                            <div className="profile-image">
                                <img src={user.avatar || ''} alt={user.name} />
                            </div>
                        ) : (
                            <div className="profile-tag">{user.name !== null && user.name.slice(0, 2)}</div>
                        )}
                    </div>
                }
                <div className={`popover account ${isPopoverShown ? 'shown' : 'hidden'}`} ref={popup}>
                    <div className="popover-container center">
                        <Link href="/user/edit">
                            <a className="item clickable">Edit profile</a>
                        </Link>
                        <Link href="/user" as={`/user`}>
                            <a className="item clickable">My favorites</a>
                        </Link>
                        <a className="item clickable" onClick={logout}>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        )
    );
}

export default UserProfileTag;
