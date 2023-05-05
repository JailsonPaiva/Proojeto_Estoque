import Header from '../../components/Header';

import styles from './CadastrarOrdem.module.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CadastrarOrdem() {
  return (
   <>
    <Header />

    <main className={styles.mainContainer}>
      <hr />

      <Form>
      <Row className="mb-3">
        <Form.Group as={Col} xs={4} controlId="formGridEmail">
          <Form.Label>Nº da ordem</Form.Label>
          <Form.Control type="text" placeholder="Digite o número da ordem" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Razão Social</Form.Label>
          <Form.Control type="text" placeholder="Razão social LTDA" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CNPJ</Form.Label>
          <Form.Control type="text" placeholder='CNPJ do fornecedor'/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Data da Entrega</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group as={Col} controlId="formFile">
          <Form.Label>Arquivo da ordem</Form.Label>
          <Form.Control type='file'/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </main>
   </>
  );
}

export default CadastrarOrdem;