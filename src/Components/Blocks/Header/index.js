import React from 'react'

import {
  AppBar,
  CssBaseline,
  Link,
  Toolbar,
  Typography
} from '@material-ui/core'
import cs from './styles.scss'

export default function Header() {
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
        </Toolbar>
      </AppBar>
    </>
  )
}
