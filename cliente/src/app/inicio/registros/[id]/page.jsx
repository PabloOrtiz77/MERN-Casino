import Graficos from '@/components/registros/Graficos';
import React, { Fragment } from 'react'

const page = ({params}) => {
  const { id } = params;
  return (
    <Fragment>
           <Graficos id={id}/>
            
    </Fragment>
  )
}

export default page