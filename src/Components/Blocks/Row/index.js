import React from 'react'
import cs from 'classnames'
import { Draggable } from 'react-beautiful-dnd'

import styles from './styles.scss'

export default function Row({ data, index, columns: _columns }) {
  const columns = _columns.map(e => e.accessor)
  console.log(data)
  if (!data) {
    return (
      <Draggable draggableId={data.key} index={index} key={data.key}>
        <tr>
          {columns.map(e => (
            <div></div>
          ))}
        </tr>
      </Draggable>
    )
  }

  return (
    <Draggable draggableId={data.name} index={index} key={data.name}>
      {(provided, snapshot) => {
        const className = cs(snapshot.isDragging && styles.draggable)
        return (
          <tr
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={className}
            ref={provided.innerRef}
            style={provided.draggableProps.style}
          >
            {columns.map(e => {
              return <td className={styles.cell}>{data[e]}</td>
            })}
          </tr>
        )
      }}
    </Draggable>
  )
}
