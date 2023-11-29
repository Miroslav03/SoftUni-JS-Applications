const host = 'http://localhost:3030/jsonstore/collections/books';

export async function request(method, data,id) {
    const settings = {
        method,
        headers: {},
    }
    if (data) {
        settings.headers['Content-Type'] = 'application/json';
        settings.body = JSON.stringify(data);
    }

    try {
        let response = null;
        if(id){
            response = await fetch(`${host}/${id}`, settings);
        }else{
            response = await fetch(host, settings);
        }

        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();

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