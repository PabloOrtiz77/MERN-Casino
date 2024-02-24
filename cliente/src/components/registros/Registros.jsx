"use client"
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios  from 'axios';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';


const Registros = () => {
    const [registros,setRegistros]=useState([])
    
    const obtenerRegistros= async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/balance", { withCredentials: true });
          const result = await response.data;
          setRegistros(result);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        obtenerRegistros()
      }, []);


  const handleDelete=async(id)=>{
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
  
    if (confirmDelete) {
      
      try {
        const response=await axios.delete(`${process.env.REACT_APP_API_DOMAIN}/balance/${id}`,{withCredentials:true})
        const result=await response.data
        obtenerRegistros()   
    } catch (error) {
        console.log(error);
    }
      
    }
  }    
  return (

    
<div style={{marginTop: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', boxSizing: 'border-box'}}>
{registros
  // Ordena los registros por la fecha de forma descendente
  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  // Mapea los registros ordenados
  .map((valor, indice) => (
    <Box
      key={indice}
      sx={{
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        backgroundColor: valor.Ingresos >= 0 ? 'lightgreen' : 'pink',
        width: 'calc(25% - 20px)',
        boxSizing: 'border-box',
        flex: '0 0 auto',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
       
      }}
    >
      <IconButton
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
        onClick={() => handleDelete(valor._id)} 
      >
        <DeleteIcon />
      </IconButton>

      <Typography variant="h6">Fecha: {valor.fecha.split('T')[0]} </Typography>
      
      <Typography variant="h6">
        {valor.Ingresos >= 0 ? 'Ganancia: ' : 'Perdida: '}{valor.Ingresos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs
      </Typography>
      <Typography variant="h6" >
        Gastos: {valor.Gastos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs
      </Typography>
      <Typography variant="h6">
       {valor.notas !== "" ? valor.notas : "No hay notas"}
      </Typography>

      <Link href={`/inicio/registros/${valor._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <VisibilityIcon />
      </Link>
  </Box>
  ))}

</div>


  )
}

export default Registros