import React from "react";

function Tr(props) {
    
    function formatCurrency(value) {
        const options = {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        const formattedValue = value.toLocaleString('pt-BR', options);
        return formattedValue;
    }

    const valorFomatado = formatCurrency(props.qtd * props.valor)

    const contador = (array) => {
        let count = 0;
      
        for (let i = 0; i < array.length; i++) {
          count++;
        }
      
        return count;
      };

    return (
        <tr>
            <td>0</td>
            <td>{props.numProduto}</td>
            <td>{props.produto}</td>
            <td>{props.descri}</td>
            <td>{props.medida}</td>
            <td>{props.vencimento}</td>
            <td>{props.qtd}</td>
            <td>{valorFomatado}</td>
        </tr>
    );
}

export default Tr;