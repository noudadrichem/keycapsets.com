export function loginUser(response) {
    window.localStorage.setItem('TOKEN', response.token);
    window.localStorage.setItem('USER', JSON.stringify(response.user));
    if (response.firstLogin) {
        window.localStorage.setItem('FIRST_LOGIN', response.firstLogin);
    }
}

export function logoutUser() {
    window.localStorage.removeItem('TOKEN');
    window.localStorage.removeItem('USER');
    window.localStorage.removeItem('FIRST_LOGIN');
    console.log('sad to see you go...');
    window.location.href = '/';
}
