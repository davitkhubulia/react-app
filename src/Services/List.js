export async function getPost(){
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await data.json();
}
export async function setItem(itemTitle, itemBody){
  let result = {};
  await fetch("https://jsonplaceholder.typicode.com/posts",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: itemTitle,
      body: itemBody
    })
  })
    .then(res => res.json()).then(data => result = data);
    return result;
}

