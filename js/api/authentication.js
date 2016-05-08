'use strict';

const BASE_URL = 'http://localhost:82/api/';

export function authenticate(email, pwd) {
    fetch("http://localhost:3000/api/authenticate", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail: email,
                               password: pwd })
    })
    .then(res => res.json())
    .then(resp => {
        if(!resp.success) throw resp.message;
        return resp;
    })
    .catch(err => { throw err.message });
}
