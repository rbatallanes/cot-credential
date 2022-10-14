import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export async function loader(params){
    console.log(params);
    // const socio = params.params.id
    // return socio
    
  }

const Home = () => {
    const [searchParams] = useSearchParams();
    const params = useParams()

    const parametros = {};

    for(let [key, value] of searchParams.entries()) {
        parametros[key] = value;
    }

    console.log(parametros);

    // const location = useLocation();
    // const history = useNavigate();

    // useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);
    
    //     if (queryParams.has("error")) {
    //       queryParams.delete("error");
    //       history.replace({
    //         search: queryParams.toString(),
    //       });
    //     }
    //   }, []);

  const removeQueryParams = () => {
    const param = searchParams.get('id');

    // if (param) {
    //   // 👇️ delete each query param
    //   searchParams.delete('id');

    //   // 👇️ update state after
    //   setSearchParams(searchParams);
    // }
  };

  const handleChange = event => {
    //setSearchParams({q: event.target.value});
  };

  //console.log(searchParams.get('id'));


  return (
    <div>
        ver: {JSON.stringify(params)}

      <button onClick={removeQueryParams}>Remove query param</button>

      <input id="search" autoComplete="off" onChange={handleChange} />
    </div>
  )
}

export default Home