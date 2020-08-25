const generate = length => {
  const randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}

export const generateData = () => {
  const data = []
  for (let i = 0; i < 100; i++)
    data.push({
      title: generate((Math.random() * 15).toFixed(0)),
      body: generate((Math.random() * 30).toFixed(0)),
      id: i
    })

  return data
}

export function generateItem(text) {
  return {
    title: text,
    body: generate((Math.random() * 30).toFixed(0)),
    id: generate((Math.random() * 5 + 4).toFixed(0))
  }
}
