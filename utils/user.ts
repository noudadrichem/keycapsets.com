export function loginUser(response) {
    window.localStorage.setItem('TOKEN', response.token);
    // window.localStorage.setItem('USER', JSON.stringify(response.user));
}

export function logoutUser(path = '/') {
    window.localStorage.removeItem('TOKEN');
    // window.localStorage.removeItem('USER');
    console.log('sad to see you go...');
    window.location.href = path;
}
