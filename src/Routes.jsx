import React from "react";
import { Routes,  Route } from 'react-router-dom';

import Home  from './pages/Home/Home'
import  CadastrarOrdem  from './pages/CadastrarOrdem/CadastrarOrdem'
import ConfirmarDados from "./pages/ConfirmarDados/ConfirmarDados";
import RegistrarSolicitacao from "./pages/RegistrarSolicitacao/RegistrarSolicitacao";
import VisualizarSolicitacao from "./pages/VisualizarSolicitacao/VisualizarSolicitacao";

export default () => {
    return(
        <Routes>
            <Route exact path="/" element={<Home />}/>
           
            <Route exact path="/cadastrar" element={<CadastrarOrdem />}/>
            
            <Route exact path="/confirmar" element={<ConfirmarDados />} />

            <Route exact path="/solicitacao" element={<RegistrarSolicitacao />} />

            <Route exact path="/visualizar-solicitacao" element={<VisualizarSolicitacao />} />

        </Routes>
    );
}
