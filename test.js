async function solution() {
    const url1 =  fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    const url2 = fetch('http://localhost:3030/jsonstore/advanced/articles/details')
    const [username,text] = await Promise.all([(await url1).json(),(await url2).json()])

    console.log(username,text);
}
solution()    
