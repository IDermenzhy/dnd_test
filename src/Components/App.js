import React from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import HomePage from './Pages/Home'
import DataProvider from '../Context/Data'

export default function() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Route component={HomePage} path={'/'} />
        <Redirect to={'/'} />
      </BrowserRouter>
    </DataProvider>
  )
}
