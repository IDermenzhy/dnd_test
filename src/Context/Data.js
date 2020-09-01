import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { getData } from 'Helpers/api'
import { generateData, generateItem } from 'Helpers/text_generator'
import DataReducer from 'Reducer/data'
import {
  ADD_DATA,
  ADD_ITEM,
  CHANGE_PAGE,
  MOVE_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM
} from '../Constants/action_types'

export const DataContext = createContext()

export const useDataContext = () => useContext(DataContext)

// eslint-disable-next-line no-extend-native
Array.prototype.isEmpty = function() {
  return this.length === 0
}

const initialState = {
  data: [],
  page: 0
}

function init() {
  return {
    page: 0,
    data: JSON.parse(localStorage.getItem('data')) ?? []
  }
}

const mockData = Array.from(Array(10).keys())

export default function DataProvider({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState, init)

  const [isLoading, setLoading] = useState(!localStorage.getItem('data'))

  useEffect(() => {
    if (state.data.isEmpty()) {
      async function fetchData() {
        let data
        try {
          data = await getData()
        } catch (e) {
          data = generateData()
        }
        return data
      }

      fetchData().then(e => {
        setLoading(false)
        dispatch({
          type: ADD_DATA,
          payload: e
        })
      })
    }
  }, [])

  function moveItems(index, destination) {
    dispatch({
      type: MOVE_ITEM,
      payload: {
        index,
        destination
      }
    })
  }

  function updateItem(event, index) {
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        index,
        text: event.target.value
      }
    })
  }

  function deleteItem(index) {
    dispatch({
      type: REMOVE_ITEM,
      payload: { index }
    })
  }

  function createItem(text) {
    dispatch({
      type: ADD_ITEM,
      payload: { text }
    })
  }

  function changePage(_, newPage) {
    dispatch({
      type: CHANGE_PAGE,
      payload: { newPage }
    })
  }

  const items = isLoading
    ? mockData
    : state.data.slice(state.page * 10, state.page * 10 + 10)

  const value = {
    items,
    isLoading,
    changePage,
    page: state.page,
    moveItems,
    updateItem,
    deleteItem,
    createItem,
    pages: Math.ceil(state.data.length / 10)
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
