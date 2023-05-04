import React from 'react'
import ReactDOM from 'react-dom/client'

import Home  from './Home'
import CadastrarOrdem from './CadastrarOrdem'

import './Global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Home /> */}
    <CadastrarOrdem />
  </React.StrictMode>,
)