export const getPer = async function (nroSoc){

    const url = `http://localhost:8080/api/personas/${nroSoc}`;
    
    try {
      const fetchResult   = await fetch(url) // MANEJAR THEN PARA NO MOSTRAR ERR EN CONSOLA
      const result        = await fetchResult.json()
  
      if (fetchResult.ok) {
            return result; // return success object
      }
      const responseError = {
        type: 'Error',
        //status: fetchResult.status,
        message: result.message || 'Something went wrong',
        data: result.data || '',
        code: result.code || '',
      };
  
      return Promise.reject(responseError)
    } catch (err) {
      //toastError(err);
      console.log(err)
      return err
    }
    
  }