import React from 'react'
import { Alert } from 'react-bootstrap'

const Mensaje = ({children,tipo}) => {
  return (
    <Alert key={tipo} variant={tipo} className="text-center m-1">
        <strong>{children}</strong>
    </Alert>
  )
}

export default Mensaje