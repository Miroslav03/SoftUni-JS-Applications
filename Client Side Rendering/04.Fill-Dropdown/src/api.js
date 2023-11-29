const url = `http://localhost:3030/jsonstore/advanced/dropdown`

export async function requester(method, text) {

    const settings = {
        method,
        headers: {},
    }

    if (text) {
        settings.headers['Content-Type'] = 'application/json';
        settings.body = JSON.stringify({text});
    }

    try {
        const res = await fetch(url, settings);
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
    } catch (error) {
        alert(error.message);
        throw new Error();
    }

}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');

export { get, post }