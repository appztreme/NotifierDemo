const BASE_URL = 'http://localhost:3000/api/';

export function authenticate(email, pwd) {
    const URL = `${BASE_URL}authenticate`;
    console.log('API CALL:', URL, email, pwd);
    return fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: email,
                               password: pwd }),
    })
    .then(res => res.json())
    .then(resp => {
        console.log('API FETCH:', resp);
        if (!resp.success) throw new Error(resp.message);
        return resp;
    }).catch(err => { throw err; });
}
