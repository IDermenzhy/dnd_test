export const getData = async () => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  ).then(res => res.json())
  return await res
}
