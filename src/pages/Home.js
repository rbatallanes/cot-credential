import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import SociosContext from '../context/SociosProvider';

export async function loader(params){
    //console.log(params);
    // const socio = params.params.id
    // return socio
  }

const Home = () => {
    const {setSocio} = useContext(SociosContext)
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
      if(id >0){
        setSocio(id)

        setTimeout(() => {
          //navigate('/credential')  
          navigate('/DigitalCredential')  
        }, 500);
        
      }
    
    }, [id])
    


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
    <Card className="text-center" bg ={'dark'} text={'white'} 
          style={{height: `${windowSize.innerHeight}px`,margin: '0px'}}>
      <Card.Header>Círculo Odontológico Tucumano</Card.Header>
      <Card.Body>
        <Card.Title>Recuperando Datos del socio {id}</Card.Title>
        <Card.Text>
          Aguarde un momento...
        </Card.Text>

        {/* <Button type="button" 
                id='buttonHome' 
                class="btn btn-secondary" 
                //onClick={onButtonClick}
                style={{backgroundColor:"black"}}>
          <Link to={`/credential`} style={{color:"white",textDecoration:"none"}}>Avanzar</Link>
        </Button> */}
            
        <Loading/>
      </Card.Body>
      <Card.Footer className="text-muted">https://cottucumano.com.ar/</Card.Footer>
    </Card>


    // <div>
    //     ver: {JSON.stringify(params)}

    //   <button onClick={removeQueryParams}>Remove query param</button>

    //   <input id="search" autoComplete="off" onChange={handleChange} />
    // </div>
  )
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export default Home