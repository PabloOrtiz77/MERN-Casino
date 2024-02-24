"use client"
import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'


const  page= () => {
    const router=useRouter()
    const {id}=useParams()
    const [entrada,setEntrada]=useState(0)
    const [salida,setSalida]=useState(0)
    const [errores,setErrores]=useState("")


    const findAnotaciones= async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/anotaciones/${id}`, { withCredentials: true });
          const result = await response.data;
          console.log(result);
          setEntrada(result.entrada)
          setSalida(result.salida)
          
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        findAnotaciones();
      }, []);

    const handleUpdate=async()=>{
        try {
            const data={
                entrada,salida
            }
        
            const response = await axios.put(
                `http://localhost:8000/api/anotaciones/${id}`,
                data,{ withCredentials: true }
              );
              const result = await response.data;
              console.log(result); //si todo salio bien hay que setear los estados
              router.push("/inicio/anotaciones")
             

        } catch (error) {
            console.log(error.response.data.errors)
            setErrores(error.response.data.errors)
        }

    }
    return (
        <Fragment>
            
        {/* <Paper sx={{p:3 }} elevation={2}>  */}
        
            <Stack sx={{p:3 ,mt:20}} elevation={5} direction={"column"} spacing={2} alignItems={"center"} >
            {/* <Typography variant="h4"></Typography> */}
            <Typography variant='h4'>Editar</Typography>
            <TextField label="entrada" 
                name="entrada" 
                value={entrada} 
                onChange={(e)=>setEntrada(e.target.value)}
                error={Boolean(errores.entrada)}
                helperText={errores.entrada?.message}
                /> 
                
               
            <TextField label="salida" 
                name="salida"
                value={salida} 
                onChange={(e)=> setSalida(e.target.value)} 
                error={Boolean(errores.salida)}
                helperText={errores.salida?.message}
                />
                <Button variant="contained" onClick={handleUpdate} type="submit">Actualizar</Button>
            </Stack>
        {/* </Paper> */}
    </Fragment>
    )
    }

export default page