import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Alert, Card, Col, Container, ListGroup, Navbar, Row, Table } from 'react-bootstrap'
import Loading from '../components/Loading'
import Mensaje from '../components/Mensaje'
import SociosContext from '../context/SociosProvider'
import { getPer } from '../Services/Persona'

const DigitalCredential = () => {

    //const {id} = useParams()

    const {socio} = useContext(SociosContext)

    const inputFile = useRef(null) 
    const [per,setPer] = useState({})
    const [msj,setMsj] = useState('')

    const [tipo, setTipo] = useState('danger')

    const [estado,setEstado] = useState('')
    const [imgDefault, setImgDefault] = useState(true)

    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [cargando, setCargando] = useState(true)

    const [windowSize, setWindowSize] = useState(getWindowSize());  //  VER

    const onButtonClick = () => {
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
        }).finally(()=>{
          setCargando(false)
        })

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

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

  return (
    // <Card className="text-center" bg ={'black'} 
    //       style={{height: `${windowSize.innerHeight}px`,margin: '0px'}}>
    <Card className="bg-dark text-center" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0px'
    }}>
    <Card className='mx-auto' bg ={'light'} text={'black'} >
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
                <Container style={{ color: '#ffffff'}}>
                <Card.Title className="text-center" >
                  Círculo Odontológico Tucumano
                </Card.Title>
                <Card.Subtitle>Credencial Digital {cargando} </Card.Subtitle>
                </Container>
              </Container>
        </Navbar> 
      </Card.Header>
      
      {cargando 
            ? <Loading/> 
            : 
            <>
            <Card.Body className='mt-0 pt-1'>

              { estado === 'Activo'
                ? imgDefault && <Alert key={'info'} variant={'info'} className="text-center m-1">
                    <strong>Agrega tu foto haciendo click en la imagen</strong>
                  </Alert>
                : <Alert key={'danger'} variant={'danger'} className="text-center m-1">
                  {!per.id
                    ? <> Ingresá nuevamente para obtener tu credencial digital <br/>
                      <Alert.Link href="https://cottucumano.com.ar/Club-de-Beneficios/Mi-C%C3%B3digo-QR-Credencial">Hacé click aquí</Alert.Link>
                      </>
                    : <>Llamá al <strong>381422830</strong> para regularizar tu situación</>}
                    
                  </Alert>
              }
    
              {msj && <Mensaje tipo={tipo}>{msj}</Mensaje>}

              <Card.Img src=  {previewImage}
                          style={{width: '10rem',
                          height: '10rem',
                          cursor: 'pointer',
                          objectFit: 'cover'}} 
                          alt='Socio'
                          onClick={onButtonClick}
              />
                        <input type='file' id='file' accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                style={{display: 'none'}} multiple onChange={handleFileChange}/>
              <Card.Title style={{ color: '#0066ff'}}>
                <strong>{per.apellido || ''} {per.nombre || ''}</strong>
              </Card.Title>

              <ListGroup >
                  <ListGroup.Item className="m-1">
                  <div className='d-flex align-items-start flex-column'>
                    <p><b style={{ color: '#0066ff'}}>SOCIO:</b> <strong>{per.id || ''}</strong></p>
                    <p><b style={{ color: '#0066ff'}}>DNI:</b> <strong>{per.dni || ''}</strong></p>
                    <p><b style={{ color: '#0066ff'}}>ALTA:</b> <strong>{new Date(per.fchAlt).toLocaleDateString() || ''}</strong></p>
                  </div>
                  </ListGroup.Item>
              </ListGroup>

              <Container className='p-1'>
                <Row>
                  <Col>
                    
                  <Card.Img src={`https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2F190.229.66.64%3A3000%2Fhome%2F${per.id}&chs=180x180&choe=UTF-8&chld=L|2`} 
                        style={{width: '100px', height: '100px'}} 
                        alt='QR'
                        className="square border border-primary"
                      />
                    
                  </Col>
                  <Col>
                    <Card.Img variant="" src=".././Raya.png" style={{width: '80px', height: '60px'}} alt='Raya'/>
                    <p style={{color:'#0066ff',fontSize:'10px'}}>Dr. José Luis Raya <br/> Sec. General C.O.T.</p>
                  </Col>
                  <Col>
                    <Card.Img src=".././Heredia.png" style={{width: '80px', height: '60px'}} alt='Heredia' variant="top"/>
                    <p style={{color:'#0066ff',fontSize:'10px'}}>Dra. Alejandra Heredia <br/> Presidente C.O.T.</p>
                  </Col>
                </Row>
              </Container>
            
            </Card.Body>
            
          
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

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

export default DigitalCredential