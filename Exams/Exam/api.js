
const host = 'http://localhost:3030/'

export async function requester(method, url, data) {
    const options = {
        method,
        headers:{}
    }

    if(data){
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data)
    }
    const user = JSON.parse(sessionStorage.getItem('user'))

    if(user){
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(`${host}${url}`,options);
        if (!response.ok) {
            if(response.status === 403){
                sessionStorage.removeItem('user');
                throw new Error('Access denied')
            }
           throw new Error('User already exists')
        }
        if(response.status === 204){
            return response;
        }else{
            const responseData = response.json();
            return responseData;
        }
    } catch (error) {
        alert(error.message);
        throw error
    }
}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const del = requester.bind(null, 'DELETE');

export { get, post, put, del }
