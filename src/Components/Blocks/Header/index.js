import React, { memo, useState } from 'react'

import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'

import { useDataContext } from 'Context/Data'

import cs from './styles.scss'
function Header() {
  const { createItem } = useDataContext()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  function handleClickOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  function addItem() {
    createItem(text)

    handleClose()
    setText('')
  }

  function onChangeText(e) {
    setText(e.target.value)
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        className={cs.appBar}
        color="default"
        elevation={0}
        position="static"
      >
        <Toolbar className={cs.toolbar}>
          <Typography
            className={cs.toolbarTitle}
            color="inherit"
            noWrap
            variant="h6"
          >
            Drag'n'drop list
          </Typography>
          <nav>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Create New Item
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Dialog
        aria-labelledby="max-width-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please enter text for your list item
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            id="item"
            label="List item"
            margin="dense"
            type="text"
            onChange={onChangeText}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus color="primary" onClick={addItem}>
            Create New Item
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(Header, (prec, next) => true)
