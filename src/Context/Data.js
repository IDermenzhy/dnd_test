import React, { createContext, useContext, useEffect, useState } from 'react'
import { getData } from 'Helpers/api'
import { generateData, generateItem } from 'Helpers/text_generator'

const DataContext = createContext()

export const useDataContext = () => useContext(DataContext)

// eslint-disable-next-line no-extend-native
Array.prototype.isEmpty = function() {
  return this.length === 0
}

const mockData = Array.from(Array(10).keys())

export default function DataProvider({ children }) {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('data')) ?? []
  )
  const [page, setPage] = useState(0)

  const [isLoading, setLoading] = useState(!localStorage.getItem('data'))

  function saveData(data) {
    localStorage.setItem('data', JSON.stringify(data))
    setData(data)
  }

  useEffect(() => {
    if (data.isEmpty()) {
      getData()
        .then(e => {
          saveData(e)
        })
        .catch(e => {
          saveData(generateData())
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  function moveItems(index, destination) {
    const itemsCount = page * 10
    const result = Array.from(data)
    const [removed] = result.splice(itemsCount + index, 1)
    result.splice(itemsCount + destination, 0, removed)
    saveData(result)
  }

  function updateItem(event, index) {
    const itemsCount = page * 10
    data[itemsCount + index].title = event.target.value
    localStorage.setItem('data', JSON.stringify(data))
  }

  function deleteItem(index) {
    const itemsCount = page * 10
    const result = Array.from(data)
    result.splice(itemsCount + index, 1)

    saveData(result)
  }

  function createItem(text) {
    const itemsCount = page * 10
    const result = Array.from(data)
    const newItem = generateItem(text)
    result.splice(itemsCount, 0, newItem)
    saveData(result)
  }

  function changePage(_, newPage) {
    setPage(newPage - 1)
  }

  const items = isLoading ? mockData : data.slice(page * 10, page * 10 + 10)

  const value = {
    items,
    isLoading,
    changePage,
    page,
    moveItems,
    updateItem,
    deleteItem,
    createItem,
    pages: Math.ceil(data.length / 10)
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
