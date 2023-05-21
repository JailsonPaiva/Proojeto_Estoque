import React from "react";

function TrHome(props) {
    return (
        <tr>
            <td>{props.numOrdem}</td>
            <td>{props.fornecedor}</td>
            <td>{props.dataEntrega}</td>
            <td>{props.valor}</td>
        </tr>
    );
}

export default TrHome;