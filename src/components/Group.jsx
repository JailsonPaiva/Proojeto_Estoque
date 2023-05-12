import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Group(props) {
    return(
        <>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control name="fornecedor" type="text" placeholder="Razão social LTDA"  value={props.fornecedor} disabled/>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}  controlId="formGridEmail">
              <Form.Label >Nº da ordem</Form.Label>
              <Form.Control name="numOrdem" type="text" placeholder="Digite o número da ordem"  value={props.numOrdem} disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Data da Entrega</Form.Label>
              <Form.Control name='data' type="text" value={props.entrega} disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="formFile">
              <Form.Label>Arquivo da ordem</Form.Label>
              <Form.Control name='arquivo' type='file'  />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Descrição</Form.Label>
              <Form.Control name='desc' type="text" placeholder='Descreva a ordem recebida' value={props.descri} disabled/>
            </Form.Group>

            <Form.Group as={Col} xs={3} controlId="formGridState">
              <Form.Label>Qtd Total</Form.Label>
              <Form.Control name='qtdTotal' type="text" placeholder='Quantidade total da ordem' value={props.qtd} disabled/>
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="formFile">
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