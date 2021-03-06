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


function createFolder() {
    let folderName = document.getElementById('FolderName').value;
    let body = {
        folderName
    }
    const url = '/api/createFolder';
    post(url, body).then((res) => {
        if (res.status == 200) {
            window.location.reload();
        }
    }).catch((err) => {
        console.log(err);
    });
}


function getUsers() {
    return new Promise((resolve, reject) => {
        let body = {
            role: 2
        }
        const url = '/api/user/getall';
        post(url, body).then((res) => {
            if (res.status == 200) {
                resolve(res.data);
            } else {
                resolve([]);
            }
        }).catch((err) => {
            console.log(err)
            resolve([]);
        });
    })
}


function updateFolderToUser(exist, email, folderName) {
    debugger
    let body = {
        email: email,
        folderName: folderName
    }
    if (!exist) {
        const url = '/api/user/addfolder';
        post(url, body).then((res) => {
            if (res.status == 200) {
                // window.location.reload();
            } else {
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        const url = '/api/user/removefolder';
        post(url, body).then((res) => {
            if (res.status == 200) {
                // window.location.reload();
            } else {
            }
        }).catch((err) => {
            console.log(err);
        });
    }

}


function getFolders() {
    return new Promise((resolve, reject) => {
        let body = {};
        const url = '/api/getfolders';
        post(url, body).then((res) => {
            if (res.status == 200) {
                resolve(res.data);
            } else {
                console.log(res)
                resolve([]);
            }
        }).catch((err) => {
            console.log(err)
            resolve([]);
        });
    })
}

function getFiles(folderName) {
    return new Promise((resolve, reject) => {
        let body = {
            folderName: folderName
        }
        const url = '/api/getfiles';
        post(url, body).then((res) => {
            if (res.status == 200) {
                resolve(res.data);
            } else {
                console.log(res)
                resolve([]);
            }
        }).catch((err) => {
            console.log(err)
            resolve([]);
        });
    })
}

function deleteFile(folderName, fileName) {
    let body = {
        folderName,
        fileName
    }
    const url = '/api/deletefile';
    return new Promise((resolve, reject) => {
        post(url, body).then((res) => {
            if (res.status == 200) {
                console.log(res)
                resolve(true)
            }
        }).catch((err) => {
            console.log(err);
            reject(null)
        });
    })
}


function getFilesFromFolders(folders) {
    let body = {
        folders
    }
    const url = '/api/getfilesfromfolders';
    return new Promise((resolve, reject) => {
        post(url, body).then((res) => {
            if (res.status == 200) {
                console.log(res)
                resolve(res.data)
            }
        }).catch((err) => {
            console.log(err);
            reject([])
        });
    })
}