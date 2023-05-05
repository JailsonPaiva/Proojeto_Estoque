import React from "react";
import { Routes,  Route } from 'react-router-dom';

import Home  from './pages/Home/Home'
import  CadastrarOrdem  from './pages/CadastrarOrdem/CadastrarOrdem'


export default () => {
    return(
        <Routes>
           <Route path="/" element={<Home />}/>
           
           <Route path="/cadastrar" element={<CadastrarOrdem />}/>
        </Routes>
    );
}