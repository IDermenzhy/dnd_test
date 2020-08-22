import React, { useMemo, useState } from 'react'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Row from 'Components/Blocks/Row'
import TableHeader from 'Components/Blocks/TableHeader'
import Header from 'Components/Blocks/Header'

import cs from './styles.scss'

import { columns } from './config'
import { useDataContext } from 'Context/Data'
import Paper from '@material-ui/core/Paper'

export default function() {
  const { items, isLoading } = useDataContext()

  function onDragStart(start, provided) {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    )
  }
  function onDragUpdate(update, provided) {
    const message = update.description
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`

    provided.announce(message)
  }
  function onDragEnd(result, provided) {
    const message = result.destination
      ? `You have moved the task from position ${result.source.index +
          1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of ${result.source
          .index + 1}`

    provided.announce(message)
  }

  return (
    <>
      <Header />
      <Paper className={cs.main}>
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
        >
          <table className={cs.table}>
            <TableHeader columns={columns} />
            <Droppable droppableId="table" isDropDisabled={isLoading}>
              {(provided, snapshot) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((e, i) => (
                    <Row
                      columns={columns}
                      data={e}
                      index={i}
                      key={e.name ?? e.key}
                    />
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
            <Footer>

            </Footer>
          </table>
        </DragDropContext>
      </Paper>
    </>
  )
}
