import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Group(props) {

  function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const descri = "Descrição da ordem de compras"

    return(
        <>
            <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Razão Social</Form.Label>
              <Form.Control name="fornecedor" type="text" placeholder="Razão social LTDA"  value={props.cnpj} disabled/>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs={4}>
              <Form.Label>CNPJ</Form.Label>
              <Form.Control value={props.cnpj} name='cnpj' type="text" placeholder='CNPJ do fornecedor' disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Data da Entrega</Form.Label>
              <Form.Control name='data' type="text" value={getCurrentDate()} disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="formFile">
              <Form.Label>Arquivo da ordem</Form.Label>
              <Form.Control name='arquivo' type='file'  />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Descrição</Form.Label>
              <Form.Control name='desc' type="text" placeholder='Descreva a ordem recebida' value={descri} disabled/>
            </Form.Group>

            <Form.Group as={Col} xs={3}>
              <Form.Label>Qtd Total</Form.Label>
              <Form.Control name='qtdTotal' type="text" placeholder='Quantidade total da ordem' value={props.qtd} disabled/>
            </Form.Group>

            <Form.Group as={Col} xs={2}>
              <Form.Label>Valor</Form.Label>
              <Form.Control name='valor' type='text' placeholder='R$ 0,00' value={props.valor} disabled/>
            </Form.Group>
          </Row>


          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Confirma dados" />
          </Form.Group>
        </>
    );

}


export default Group;