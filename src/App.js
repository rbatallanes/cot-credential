import React, { useEffect, useRef, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Router,Route, Routes } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Alert, Button, ListGroup, Row, Table } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getPer } from './Services/Persona';
import axios from 'axios';

function App() {

  const inputFile = useRef(null) 
  const [per,setPer] = useState({})
  const [msj,setMsj] = useState('')
  const [estado,setEstado] = useState('')

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const onButtonClick = () => {
  //  inputFile.current.click();
  //  console.log(inputFile);
    document.getElementById("file").click()
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const objectURL = URL.createObjectURL(event.target.files[0])
    //setPreviewImage(objectURL)
    console.log(event.target.files[0])
    handleSubmit(event)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

		data.append('file', file);
    //data.append('usr', 1010);

		// fetch(
		// 	'http://localhost:8080/api/personas/1010',
		// 	{
    //     method: "POST",
		// 		body: data,
    //   }
		// ).then((response) => response.json())
		// 	.then((result) => {
		// 		console.log('Success:', result);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error:', error);
		// 	});

    axios.post(`http://localhost:8080/api/personas/${per.id}`, data, { 
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(res => { // then print response status
        console.log(res)
        setPreviewImage(res.data)
    }).catch((error) => {
      	console.error('Error:', error);
    });
  }

  useEffect(()=>{
    getPer(1129).then(response=>{
      
      if(response.fchBaj === null){
        setPer(response)
        setEstado('Activo')
        //setPreviewImage(response.picture)
      }else{
        console.log('baja de socio')
        setPer([])
        setEstado('Inactivo')
      }
      
    }).catch(err=>{
        setMsj(err.message)
        setPer([])

        setTimeout(() => {
            setMsj('')
        }, 4000);
    })
  },[])

  useEffect(()=>{
    let img = per.picture === null || !per.picture
           ? '.././usr.png'
           : `http://localhost:8080/api/files/${per.picture}`
  
      setPreviewImage(img)
           
  },[per,previewImage])

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
    <Card style={{ width: '23rem', margin: '5px'}} >
      
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
        <Card.Img variant="" src= { previewImage } 
        
          style={{width: '100px', height: '110px',cursor:'pointer'}} alt='Socio'/>
        <input type='file' id='file' ref={inputFile} style={{display: 'block'}} multiple
          onChange={handleFileChange}/>
        <Card.Text style={{ color: '#0066ff'}}>
          <strong>{per.apellido || ''} {per.nombre || ''}</strong>
        </Card.Text>
        
        <Button 
            className="btn btn-primary mt-3" 
            onClick={handleSubmit}
            >Upload</Button>

      </Card.Body>
      <ListGroup className="list-group-flush mb-0">
        <ListGroup.Item className="m-0">
          <p><b style={{ color: '#0066ff'}}>SOCIO:</b> <strong>{per.id || ''}</strong></p>
          <p><b style={{ color: '#0066ff'}}>DNI:</b> <strong>{per.dni || ''}</strong></p>
          <p><b style={{ color: '#0066ff'}}>ALTA:</b> <strong>{new Date(per.fchAlt).toLocaleDateString() || ''}</strong></p>
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
        <ListGroup.Item action variant={estado==='Activo'?'primary ':'danger'}>
          <p>Estado:<b> {estado}</b></p>
        </ListGroup.Item>
      </ListGroup>

    </Card>  
   </Card>
  
  );
}

export default App;
