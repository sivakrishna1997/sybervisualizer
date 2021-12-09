

function getuser() {
    let user = null;
    if (!!localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
    }
    return user;
};

function checkAuth() {
    let user = getuser();
    if (user) {
        if (user.role == 2) {
            if (window.location.pathname !== '/dashboard') {
                window.location.replace('/dashboard');
            }
        }
    } else {
        window.location.replace('/');
    }

} checkAuth();

