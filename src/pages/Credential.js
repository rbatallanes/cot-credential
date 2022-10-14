import React, { useEffect, useRef, useState }  from 'react';

import { getPer } from '../Services/Persona';
import Loading from '../components/Loading';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import { Alert, ListGroup, Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import Mensaje from '../components/Mensaje';
import { useLoaderData, useParams, useSearchParams } from 'react-router-dom';


export async function loader(params){
  //console.log(params);
  const socio = params.params.id
  const url   = params.request.url.slice(0,5)

  /* if(!localStorage.getItem('socio') || url === 'https'){
    localStorage.setItem('socio',socio)
    return socio
  }
  return localStorage.getItem('socio') */

  return socio
  
}

const Credential = () => {

  const socio = useLoaderData()
  //console.log(socio);

  const inputFile = useRef(null) 
  const [per,setPer] = useState({})
  const [msj,setMsj] = useState('')

  const [tipo, setTipo] = useState('danger')

  const [estado,setEstado] = useState('')
  const [imgDefault, setImgDefault] = useState(true)

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [cargando, setCargando] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams();
  

  const removeQueryParams = () => {
    const param = searchParams.get('id');

    if (param) {
      // 👇️ delete each query param
      searchParams.delete('id');

      // 👇️ update state after
      setSearchParams(searchParams);
    }
  };

  const onButtonClick = () => {
  //  inputFile.current.click();
    document.getElementById("file").click()
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const objectURL = URL.createObjectURL(event.target.files[0])
    //setPreviewImage(objectURL)
  }

  useEffect(()=>{

    getPer(socio).then(response=>{
      
      setPer(response)
      if(response.picture != null){setImgDefault(false)}
      response.fchBaj === null ? setEstado('Activo') : setEstado('Inactivo')
      
      
    }).catch(err=>{
        setMsj(err.message)
        setPer([])

        setTimeout(() => {
            setMsj('')
        }, 5000);
    })
    setCargando(false)
  },[])

  useEffect(()=>{
    let img = per.picture === null || !per.picture
           ? '.././usr.png'
           : `${process.env.REACT_APP_PUBLIC_URL}/api/files/${per.picture}`
  
      setPreviewImage(img)
      
  },[per,previewImage])

  useEffect(() => {
    if(!!file){
      const data = new FormData();
      data.append('file', file);

      axios.post(`${process.env.REACT_APP_PUBLIC_URL}/api/personas/${per.id}`, data, { 
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(res => { // then print response status
          console.log(res)
          per.picture = res.data // VER
          setPreviewImage(res.data)
          setImgDefault(false)
          
          setMsj('Tu foto ya está lista!!')
          setTipo('success')

          setTimeout(()=>{
              setMsj('')
              setTipo('')
            },3000)
      }).catch((error) => {
        if(error.response.status === 417){
          setMsj(error.response.data)
          setTipo('danger')
          setTimeout(()=>{
              setMsj('')
              setTipo('')
            },5000)

          return
        }
        console.error('Error:', error);
      });
    }
    
  }, [file])


  return (
    
    <Card className="bg-dark text-pink" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <button onClick={removeQueryParams}>Remove error param</button>

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
    
    
          {cargando 
            ? <Loading/> 
            : 
            <>
              { estado === 'Activo'
                ? imgDefault && <Alert key={'info'} variant={'info'} className="text-center m-1">
                    <strong>Agrega tu foto haciendo click en la imagen</strong>
                  </Alert>
                : <Alert key={'danger'} variant={'danger'} className="text-center m-1">
                    Llamá al <strong>381422830</strong> para regularizar tu situación
                  </Alert>
              }
    
              {msj && <Mensaje tipo={tipo}>{msj}</Mensaje>}
    
              <Card.Body className="text-center mt-0 mb-1" onClick={onButtonClick} border="primary"> 
                <Card.Img variant="" src= { previewImage } 
                
                  style={{width: '10rem',
                    height: '10rem',
                    cursor: 'pointer',
                    objectFit: 'cover'}} 
                    alt='Socio'/>
                <input type='file' id='file' accept="image/png, image/gif, image/jpeg, image/jpg, image/svg" ref={inputFile} 
                        style={{display: 'none'}} multiple onChange={handleFileChange}/>
                <Card.Text style={{ color: '#0066ff'}}>
                  <strong>{per.apellido || ''} {per.nombre || ''}</strong>
                </Card.Text>
                
    
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
                        <Card.Img src={`https://www.codigos-qr.com/qr/php/qr_img.php?d=http%3A%2F%2F190.229.66.64:3000%2Fcredential%2F${per.id}&s=4&e=m`} style={{width: '100%', height: '100px'}} alt='QR'/>
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
            
            </>
          }
    
        </Card>  
       </Card>
  )
}

export default Credential