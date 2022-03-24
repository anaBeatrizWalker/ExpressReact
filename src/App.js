import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Menu from './components/Menu'
import Rotas from './Rotas'

export default props => {
  return (
    <BrowserRouter>
        <Menu/>
        <Rotas/>
    </BrowserRouter>
  )
}
