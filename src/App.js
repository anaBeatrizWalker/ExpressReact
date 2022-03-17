import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Nav from './components/Nav'
import Rotas from './Routes'

export default props => {
  return (
    <BrowserRouter>
        <Nav/>
        <Rotas/>
    </BrowserRouter>
  )
}
