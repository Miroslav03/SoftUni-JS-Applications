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

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        settings.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(`${host}${path}`, settings);

        if (!response.ok) {
            if(response.status === 403){
                sessionStorage.removeItem('user');
                throw new Error('Access denied')
            }
           throw new Error(response.status)
        }
        if(response.status === 204){
            return response;
        }else{
            const responseData = response.json();
            return responseData;
        }
        

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