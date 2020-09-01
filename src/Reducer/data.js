import produce from 'immer'

import { handler } from 'Helpers/reducer'
import {
  ADD_DATA,
  ADD_ITEM,
  CHANGE_PAGE,
  MOVE_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM
} from 'Constants/action_types'
import { generateItem } from 'Helpers/text_generator'

const handlers = {
  [REMOVE_ITEM]: (draft, { payload }) => {
    const itemsCount = draft.page * 10
    draft.data.splice(itemsCount + payload.index, 1)

    localStorage.setItem('data', JSON.stringify(draft.data))
  },
  [ADD_DATA]: (draft, { payload }) => {
    draft.data = payload
    localStorage.setItem('data', JSON.stringify(payload))
  },
  [CHANGE_PAGE]: (draft, { payload }) => {
    draft.page = payload.newPage - 1
  },
  [ADD_ITEM]: (draft, { payload }) => {
    const itemsCount = draft.page * 10
    const newItem = generateItem(payload.text)
    draft.data.splice(itemsCount, 0, newItem)
  },
  [UPDATE_ITEM]: (draft, { payload }) => {
    const itemsCount = draft.page * 10
    draft.data[itemsCount + payload.index].title = payload.text
    localStorage.setItem('data', JSON.stringify(draft.data))
  },
  [MOVE_ITEM]: (draft, { payload }) => {
    const itemsCount = draft.page * 10
    const [removed] = draft.data.splice(itemsCount + payload.index, 1)
    draft.data.splice(itemsCount + payload.destination, 0, removed)
    localStorage.setItem('data', JSON.stringify(draft.data))
  }
}

export default handler(handlers)
