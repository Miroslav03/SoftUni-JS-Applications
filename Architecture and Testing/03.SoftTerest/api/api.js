const host = 'http://localhost:3030/';

export async function request(method, path, data) {
    const settings = {
        method,
        headers: {},
    }
    if (data) {
        settings.headers['Content-Type'] = 'application/json';
        settings.body = JSON.stringify(data);
    }

    const user = sessionStorage.getItem('user');

    if (user) {
        settings.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(`${host}${path}`, settings);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export { get, post, put, del }