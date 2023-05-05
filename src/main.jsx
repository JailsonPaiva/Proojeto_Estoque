import React from 'react'
import ReactDOM from 'react-dom/client'



import Home  from './pages/Home/Home'
import  CadastrarOrdem  from './pages/CadastrarOrdem/CadastrarOrdem'

import './Global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <CadastrarOrdem />
  </React.StrictMode>,
)