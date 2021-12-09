
/*********** METHODS START **************/
const baseUrl = ""

function getheaders() {
    // var options = { 'Content-Type': 'application/json' , 'Authorization': 'Bearer my-token', };
    var options = { 'Content-Type': 'application/json' };
    return options;
}

function get(url) {
    return fetch(baseUrl + url, getheaders()).then(response => response.json())
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(body)
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
}

function update(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: getheaders(),
        body: JSON.stringify(body)
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
}

function remove(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: getheaders()
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
}
/************ METHODS END ***************/


/*********** APIS ***************/
function login() {
    let errormessage = document.getElementById('errormessage')
    errormessage.innerHTML = "";
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let body = {
        email,
        password
    }
    const url = '/api/user/login';
    post(url, body).then((res) => {
        if (res.status == 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
            if (res.data.role == 1) {
                window.location.replace('/home');
            } else {
                window.location.replace('/dashboard');
            }
        } else {
            errormessage.innerHTML = res.message;
        }
    }).catch((err) => {
        console.log(err);
        errormessage.innerHTML = err.message;
    });
}
