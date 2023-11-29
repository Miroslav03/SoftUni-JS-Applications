const url = `http://localhost:3030/jsonstore/advanced/table`

export async function requester(method) {

    const settings = {
        method,
        headers: { 'Content-Type': 'application/json' },
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

export { get }