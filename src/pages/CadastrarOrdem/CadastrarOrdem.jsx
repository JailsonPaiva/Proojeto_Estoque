import React, { useState } from 'react';
import Axios from "axios";

import Header from '../../components/Header';

import { Link } from 'react-router-dom'

import styles from './CadastrarOrdem.module.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CadastrarOrdem() {
  const [values, setValues] = useState();
  // console.log(values)
  const handleChangeValues = (value) => {
    setValues((data) => ({
      ...data,
      [value.target.name]: value.target.value,
    }))
  }

  const handleClickProximo = () =>{
    Axios.post("http://localhost:8080/confirmar", {
      // ordem, cnpj, fornecedor, entrega, valor, qtd, descri
      ordem: values.numOrdem,
      fornecedor: values.razaoSocial,
      cnpj: values.cnpj,
      entrega: values.data,
      descri: values.desc,
      qtd: values.qtdTotal,
      valor: values.valor
    }).then((response) => {
      console.log(response)
    });
  };

  return (
   <>
    <Header />
    
    <hr className={styles.hr}/>

    <main className={styles.mainContainer}>

      <Form>
      <Row className="mb-3">
        <Form.Group as={Col} xs={4} controlId="formGridEmail">
          <Form.Label >Nº da ordem</Form.Label>
          <Form.Control onChange={handleChangeValues} name="numOrdem" type="text" placeholder="Digite o número da ordem" required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Razão Social</Form.Label>
          <Form.Control onChange={handleChangeValues} name="razaoSocial" type="text" placeholder="Razão social LTDA" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CNPJ</Form.Label>
          <Form.Control onChange={handleChangeValues} name='cnpj'  type="text" placeholder='CNPJ do fornecedor' required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Data da Entrega</Form.Label>
          <Form.Control onChange={handleChangeValues} name='data'  type="text" />
        </Form.Group>

        <Form.Group as={Col} controlId="formFile">
          <Form.Label>Arquivo da ordem</Form.Label>
          <Form.Control onChange={handleChangeValues} name='arquivo' type='file' required/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Descrição</Form.Label>
          <Form.Control onChange={handleChangeValues} name='desc' type="text" placeholder='Descreva a ordem recebida'/>
        </Form.Group>

        <Form.Group as={Col} xs={3} controlId="formGridState">
          <Form.Label>Qtd Total</Form.Label>
          <Form.Control onChange={handleChangeValues} name='qtdTotal' type="text"  placeholder='Quantidade total da ordem'/>
        </Form.Group>

        <Form.Group as={Col} xs={2} controlId="formFile">
          <Form.Label>Valor</Form.Label>
          <Form.Control onChange={handleChangeValues} name='valor' type='text' placeholder='R$ 0,00'/>
        </Form.Group>
      </Row>
    

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Confirma dados" />
      </Form.Group>

      <div className={styles.divButton}>

        <Button variant="success" onClick={handleClickProximo}>
          <Link to="/confirmar" className={styles.link}>Próximo</Link>
        </Button>
         

        <Button variant="danger" type="submit" >
          Limpar
        </Button>
      </div>
    </Form>

    </main>
   </>
  );
}

export default CadastrarOrdem;