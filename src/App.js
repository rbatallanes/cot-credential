import React, { useRef }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Router,Route, Routes } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Alert, ListGroup, Row, Table } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const inputFile = useRef(null) 

  const onButtonClick = () => {
   inputFile.current.click();
  };

  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<Credential/>}/>
    //   </Routes>
    // </Router>

  <Card className="bg-dark text-pink" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Card style={{ width: '24rem', margin: '5px'}} >
      
      <Card.Header as="h3" style={{ backgroundColor:'#0066ff'}}>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <img
                alt=""
                src="/logo90.png"
                width="50"
                height="60"
                className="d-inline-block align-top"
              />{' '}
              

            </Navbar.Brand>
            <Card.Text className="text-center" style={{ color: '#ffffff'}}>
              Círculo Odontológico Tucumano
            </Card.Text>
          </Container>
        </Navbar>
      </Card.Header>

      {/* <Card border="info" className="text-center m-1">
        <Card.Body>
          <Card.Text>
              Agrega tu foto haciendo click en la imagen
          </Card.Text>
        </Card.Body>
      </Card> */}

      <Alert key={'info'} variant={'info'} className="text-center m-1">
          <strong>Agrega tu foto haciendo click en la imagen</strong>
        </Alert>

      <Card.Body className="text-center mt-0 mb-1" onClick={onButtonClick}>
        <Card.Img variant="" src=".././usr.png" style={{width: '100px', height: '110px',cursor:'pointer'}} alt='Socio'/>
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
        <Card.Text style={{ color: '#0066ff'}}>
          <strong>HEREDIA, ALEJANDRA</strong>
        </Card.Text>
        
      </Card.Body>
      <ListGroup className="list-group-flush mb-0">
        <ListGroup.Item className="m-0">
          <p><b style={{ color: '#0066ff'}}>SOCIO:</b> <strong>1010</strong></p>
          <p><b style={{ color: '#0066ff'}}>DNI:</b> <strong>17494199</strong></p>
          <p><b style={{ color: '#0066ff'}}>ALTA:</b> <strong>23/01/90</strong></p>
        </ListGroup.Item>
      </ListGroup>

      <Table striped className="mb-0">
        <tbody>
          <tr>
            <td >
              <Card border="primary">
                <Card.Img src="https://www.codigos-qr.com/qr/php/qr_img.php?d=http%3A%2F%2F190.229.66.64%2Fcottucumano%2Fpublic_html%2FCOTonline%2FLoginCard.php%3FSoc%3D1010&s=4&e=m" style={{width: '100%', height: '100px'}} alt='QR'/>
              </Card>
            </td>
            <td className="text-center">
              <Card.Img variant="" src=".././Raya.png" style={{width: '80px', height: '60px'}} alt='Raya'/>
              <p style={{color:'#0066ff',fontSize:'10px'}}>Dr. José Luis Raya <br/> Sec. General C.O.T.</p>
            </td>
            <td className="text-center">
              <Card.Img variant="" src=".././Heredia.png" style={{width: '80px', height: '60px'}} alt='Heredia'/>
              <p style={{color:'#0066ff',fontSize:'10px'}}>Dra. Alejandra Heredia <br/> Presidente C.O.T.</p>
            </td>

          </tr>
  
        </tbody>
      </Table>
      <ListGroup className="list-group-flush mb-0 text-center">
        <ListGroup.Item action variant="primary">
          <p>Estado:<b> Activo</b></p>
        </ListGroup.Item>
      </ListGroup>

    </Card>  
   </Card>
  
  );
}

export default App;
