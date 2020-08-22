export const getData = async () => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/comments'
  ).then(res => res.json())
  return await res.slice(0, 100)
}
