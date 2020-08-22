import React, { createContext, useContext, useEffect, useState } from 'react'
import { getData } from 'Helpers/api'
import { generateData } from 'Helpers/text_generator'

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

  useEffect(() => {
    function saveData(data) {
      localStorage.setItem('data', JSON.stringify(data))
      setData(data)
    }

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

  const items = isLoading ? mockData : data.slice(page * 10, page * 10 + 10)

  const value = {
    items,
    isLoading,
    setPage,
    page
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
