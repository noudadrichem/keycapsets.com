export function loginUser(response) {
    window.localStorage.setItem('TOKEN', response.token);
    window.localStorage.setItem('USER', JSON.stringify(response.user));
    if (response.firstLogin) {
        window.localStorage.setItem('FIRST_LOGIN', response.firstLogin);
    }
}
