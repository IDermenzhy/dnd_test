import produce from 'immer'

export const handler = handlers => (state, action) =>
  handlers[action.type]
    ? produce(state, draft => handlers[action.type](draft, action))
    : state
