import React, { memo, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import cs from 'classnames'
import Skeleton from '@material-ui/lab/Skeleton'
import Button from '@material-ui/core/Button'

import styles from './styles.scss'

function ListItem({ data, index, updateItem, deleteItem }) {
  const [editable, setEditable] = useState(false)

  function onDoubleClick() {
    setEditable(x => !x)
  }

  return (
    <Draggable draggableId={data.title ?? data.key} index={index}>
      {(provided, snapshot) => {
        const className = cs(
          snapshot.isDragging && styles.draggable,
          styles.item
        )
        if (!data.title) {
          return <Skeleton animation="wave" variant="text" />
        }

        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={className}
            ref={provided.innerRef}
            style={provided.draggableProps.style}
          >
            {editable ? (
              <input
                autoFocus={true}
                className={styles.input}
                defaultValue={data.title}
                type="text"
                onBlurCapture={onDoubleClick}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={e => updateItem(e, index)}
              />
            ) : (
              <span onDoubleClick={onDoubleClick}>{data.title}</span>
            )}
            <Button
              color="secondary"
              variant="contained"
              /* eslint-disable-next-line react/jsx-no-bind */
              onClick={() => deleteItem(index)}
            >
              Delete
            </Button>
          </div>
        )
      }}
    </Draggable>
  )
}

export default memo(ListItem, (prev, next) => {
  // console.log(prev, next)
  return prev.index === next.index
})
