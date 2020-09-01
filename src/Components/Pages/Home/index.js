import React from 'react'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Pagination from '@material-ui/lab/Pagination'
import Paper from '@material-ui/core/Paper'

import Header from 'Components/Blocks/Header'
import ListItem from 'Components/Blocks/ListItem'

import { useDataContext } from 'Context/Data'

import styles from './styles.scss'

export default function() {
  const {
    items,
    isLoading,
    moveItems,
    page,
    changePage,
    updateItem,
    deleteItem,
    pages
  } = useDataContext()

  function onDragEnd({ source, destination }, provided) {
    moveItems(source.index, destination.index)
  }

  return (
    <>
      <Header />
      <Paper className={styles.main}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="table" isDropDisabled={isLoading}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((e, i) => (
                  <ListItem
                    data={e}
                    deleteItem={deleteItem}
                    index={i}
                    key={e.title ?? e.toString()}
                    updateItem={updateItem}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.footer}>
          <Pagination
            count={pages}
            disabled={isLoading}
            page={page + 1}
            shape="rounded"
            onChange={changePage}
          />
        </div>
      </Paper>
    </>
  )
}
