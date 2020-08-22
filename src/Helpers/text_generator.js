const generate = textLength =>
  Math.random()
    .toString(36)
    .substring(textLength)

export const generateData = () => {
  const data = []
  for (let i = 0; i < 100; i++)
    data.push({
      name: generate((Math.random() * 15).toFixed(0)),
      email: generate((Math.random() * 12).toFixed(0)),
      body: generate((Math.random() * 30).toFixed(0)),
      id: i
    })

  return data
}
