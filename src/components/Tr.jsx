import React from "react";

function Tr(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.numProduto}</td>
            <td>{props.produto}</td>
            <td>{props.descri}</td>
            <td>{props.medida}</td>
            <td>{props.vencimento}</td>
            <td>{props.qtd}</td>
            <td>{props.valor}</td>
        </tr>
    );
}

export default Tr;