import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'


import Home  from './pages/Home/Home'
import  CadastrarOrdem  from './pages/CadastrarOrdem/CadastrarOrdem'
import ConfirmarDados from './pages/ConfirmarDados/ConfirmarDados'

import './Global.scss'
import Routes from './Routes'
import Cu from './pages/paunocu/cu'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
)