import React from "react";

function Tr(props) {

    // function i() {
    //     for (let j = 0; j <= 10 ; j++) {           
    //         console.log(j)
    //         return j
    //     }
    // }    

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.numProduto}</td>
            <td>{props.nomeProduto}</td>
            <td>{props.descri}</td>
            <td>{props.medida}</td>
            <td>{props.vencimento}</td>
            <td>{props.qtd}</td>
            <td>{props.valor}</td>
            <td>{props.lote}</td>
        </tr>
    );
}

export default Tr;