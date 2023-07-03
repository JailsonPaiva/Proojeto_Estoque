import React, { useState } from 'react';
import moment from 'moment';
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
    if (!values.ordem) {
      toast.error('O campo de "Nº ORDEM" é inválido.');
    } else {
      Axios.post("http://localhost:8080/consultar", {
        ordem: values.ordem
      }).then((response) => {
        const data = response.data

       /* if (!data[0].length || data[0].length <= 0) {
          toast.error('Não foi encontrado nenhuma ordem com esse numero.');

        } */if (data[0][0].data_recebimento !== null) {
          const recebimento = formatarData(data[0][0].data_recebimento)
          const hoje = getCurrentDate(new Date())
          // console.log(recebimento, hoje)
          if(recebimento <= hoje) {
            toast.error('Essa ordem já foi registrada.');
            limpa()
          }
        } else {
          toast.success('Consulta realiza!');
          setNewValues(data)
          const cnpj = data[0][0].cnpj
          maskCnpj(cnpj)
          setNewCnpj(maskCnpj(cnpj))
        }
      }).catch((err) => {
        toast.error('Ocorreu um erro ao fazer a consulta');
      })
      // console.log(newValues[1][0].total)
    }


  }

  const limpa = () => {
    setNewValues([])
    setNewCnpj('')
    setValues([])
  }

  // const getConfirmar = () => {
  //   Axios.get("/confirmar", {
  //     params: values.ordem
  //   }).then((response) => {
  //     console.log(response)
  //   })
  // }


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

  function getCurrentDate(data) {
    const currentDate = data;
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const formatarData = (data) => {
    const dataFormatada = moment(data).format('DD/MM/YYYY');
    return dataFormatada;
  };


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
                type="number"
                className='px-3'
                placeholder='Numero da Ordem'
                required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name="fornecedor"
                className='px-3'
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
                className={`${styles.cnpj} px-3`}
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
                className='px-3'
                name='data'
                type="text"
                value={!newValues.length ? '' : getCurrentDate(new Date())}
                disabled />
            </Form.Group>

            <Form.Group as={Col} controlId="formFile">
              <Form.Label>CNAE</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name="cnae"
                className='px-3'
                type="text"
                value={!newValues.length ? '' : newValues[0][0].cnae}
                placeholder="0000/00"
                disabled />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                name='desc'
                type="text"
                value={'dscri'}
                placeholder='Descreva a ordem recebida'
                disabled />
            </Form.Group> */}

            <Form.Group as={Col} xs={6} controlId="formGridState">
              <Form.Label>Qtd Total</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                className='px-3'
                name='qtdTotal'
                type="text"
                value={!newValues.length ? '' : newValues[1][0].total}
                placeholder='Quantidade total da ordem'
                disabled />
            </Form.Group>

            <Form.Group as={Col} xs={6} controlId="formFile">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                onChange={handleChangeValues}
                className='px-3'
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