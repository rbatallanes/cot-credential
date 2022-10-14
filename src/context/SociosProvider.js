import React, { createContext, useState } from 'react'

const SociosContext = createContext()


const SociosProvider = ({children}) => {

  const [socio, setSocio] = useState(0)

  return (

    <SociosContext.Provider
        value={{socio,setSocio}}
    >
        {children}
    </SociosContext.Provider>
  )
}

export{
    SociosProvider
}

export default SociosContext