import React, { useState } from 'react';
import Axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from '../../components/Header';
import Group from '../../components/Group';

import { Link } from 'react-router-dom'

import styles from './CadastrarOrdem.module.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



function CadastrarOrdem() {
  const [values, setValues] = useState([]);
  const [newValues, setNewValues] = useState([]);
  const [newCnpj, setNewCnpj] = useState('');
  // console.log(values)
  const handleChangeValues = (value) => {
    setValues((data) => ({
      ...data,
      [value.target.name]: value.target.value,
    }))
  }

  //ROTAS
  const consultar = () => {

    if(!values.ordem) {
      toast.error('O campo de "Nº ORDEM" precisa ser preenchido!');
    } else {
      Axios.post("http://localhost:8080/consultar", {
        ordem: values.ordem
      }).then((response) => {
        const data = response.data
        // console.log(response)
        if(!data[0].length || data[0].length <= 0) {
          toast.error('Não foi encontrado nenhuma ordem com esse numero.');
          // console.log(newValues)
        } else {
          // console.log(data)
          toast.success('Consulta realiza!');
          setNewValues(data)
          const cnpj = '1234567890'
          maskCnpj(cnpj)
          setNewCnpj(maskCnpj(cnpj))
        }
      }).catch((err) => {
        toast.error('Ocorreu um erro ao fazer a consulta');
      })
      // console.log(newValues[1][0].total)
    }


  }


  const getConfirmar = () => {
    Axios.get("/confirmar", {
      params: values.ordem
    }).then((response) => {
      console.log(response)
    })
  }


  // const consultar = async () => {
  //   await Axios.post("http://localhost:8080/consultar", {
  //     ordem: values.ordem
  //   }).then((response) => {
  //     setNewValues(response.data)
  //     console.log(response.data[0])
  //     console.log(newValues)
  //   })
  // }


  //MASCARAS

  function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function maskCnpj(cnpj) {
    const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
    return cnpj.replace(cnpjRegex, "$1.$2.$3/$4-$5");
  }

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

  // const handleClickProximo = () => {
  //   Axios.get("http://localhost:8080/consultar", {
  //     // ordem, cnpj, fornecedor, entrega, valor, qtd, descri
  //     ordem: values.numOrdem,
  //     fornecedor: values.fornecedor,
  //     cnpj: values.cnpj,
  //     entrega: values.data,
  //     descri: values.desc,
  //     qtd: values.qtdTotal,
  //     valor: values.valor
  //   }).then((response) => {
  //     console.log(response)
  //   });
  // };
  const url = `/confirmar?ordem=${values.ordem}`

  return (
    <>
      <ToastContainer />

      <Header url="/" />

      <hr className={styles.hr} />

      <main className={styles.mainContainer}>

        <Form>

          <Row className="mb-3">
            <Form.Group as={Col} xs={4}>
              <Form.Label>Nº ORDEM</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                // onBlur={consultar}
                name='ordem'
                type="text"
                placeholder='Numero da Ordem'
                required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name="fornecedor"
                type="text"
                value={!newValues.length ? '' : newValues[0][0].razao_social}
                placeholder="Razão social LTDA"
                disabled />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs={4} controlId="formGridCity">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                // name='cnpj' 
                type="text"
                mask="99.999.999/9999-99"
                className={styles.cnpj}
                pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                value={!newValues.length ? '' : newCnpj}
                placeholder='CNPJ do fornecedor'
                disabled />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Data da Entrega</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                placeholder='00/00/0000'
                name='data'
                type="text"
                value={!newValues.length ? '' : getCurrentDate()}
                disabled />
            </Form.Group>

            <Form.Group as={Col} controlId="formFile">
              <Form.Label>Arquivo da ordem</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name='arquivo'
                type='file'
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name='desc'
                type="text"
                value={'dscri'}
                placeholder='Descreva a ordem recebida'
                disabled />
            </Form.Group>

            <Form.Group as={Col} xs={3} controlId="formGridState">
              <Form.Label>Qtd Total</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name='qtdTotal'
                type="text"
                value={!newValues.length ? '' : newValues[1][0].total}
                placeholder='Quantidade total da ordem'
                disabled />
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="formFile">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name='valor'
                type='text'
                value={!newValues.length ? '' : formatCurrency(newValues[0][0].valor)}
                placeholder='R$ 0,00'
                disabled />
            </Form.Group>
          </Row>

          <div className={styles.divButton}>

            <Button variant="primary">
              <Link onClick={consultar} className={styles.link}>Buscar</Link>
            </Button>


            <Button variant="success" type="submit" >
              <Link to={url} > Próximo</Link>
            </Button>
          </div>
        </Form>

      </main>
    </>
  );
}

export default CadastrarOrdem;