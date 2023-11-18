function attachEvents() {
    const loadPostBtn = document.getElementById('btnLoadPosts');
    const viewPostBtn = document.getElementById('btnViewPost');
    const posts = document.getElementById('posts');

    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    const optionsData = [];

    loadPostBtn.addEventListener('click', getPosts)

    async function getPosts() {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
            const data = await response.json();
            if (!response.ok) {
                throw new Error()
            }
            posts.innerHTML = '';
            for (const [id, obj] of Object.entries(data)) {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = obj.title.toUpperCase()
                posts.appendChild(option)
                optionsData.push({ name: obj.title, text: obj.body, id })
            }
        } catch (error) {
            console.error(error)
        }
    }

    viewPostBtn.addEventListener('click', viewPosts)

    async function viewPosts() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/blog/comments/`);
            const data = await response.json()
            if (!response.ok) {
                throw new Error()
            }
            const comments = Object.entries(data).filter((arr) => arr[1].postId === posts.value);

            //clearing previous entries
            postTitle.innerHTML = '';
            postBody.innerHTML = '';
            postComments.innerHTML = '';

            const currentObj = optionsData.filter((obj) => obj.id.toUpperCase() === posts.value.toUpperCase());
            postTitle.textContent = currentObj[0].name;
            postBody.textContent = currentObj[0].text;

            for (const arr of comments) {
                const comment = arr[1].text
                const li = document.createElement('li');
                li.textContent = comment;
                li.className = arr[1].id
                postComments.appendChild(li)
            }

        } catch (error) {
            console.error(error)
        }
    }

}

attachEvents();