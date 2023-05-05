import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'


import Home  from './pages/Home/Home'
import  CadastrarOrdem  from './pages/CadastrarOrdem/CadastrarOrdem'

import './Global.scss'
import Routes from './Routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
      <Home />
      <CadastrarOrdem />
    </BrowserRouter>
  </React.StrictMode>,
)