"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EditButton = styled(Button)`
  && {
    background-color: #007bff; /* Cambia el color de fondo del botón */
    color: #fff; /* Cambia el color del texto del botón */
    text-transform: none; /* Desactiva la transformación del texto a mayúsculas */
    /* Agrega más estilos según tus preferencias */
  }
`;

export default function Anotaciones() {
    const [maquinas, setMaquinas] = useState([]);
    const [anotaciones, setAnotaciones] = useState([]);


    const findMaquinas= async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/maquinas", { withCredentials: true });
          const result = await response.data;
          setMaquinas(result);
        } catch (error) {
          console.log(error);
        }
      };

    const findAnotaciones= async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/anotaciones/", { withCredentials: true });
          const result = await response.data;
          setAnotaciones(result);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        findMaquinas();
        findAnotaciones();
      }, []);

  return (
    <TableContainer component={Paper} sx={{maxWidth:"800px", m:"10px auto"}}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre Maquina</StyledTableCell>
            <StyledTableCell align="center">Entrada</StyledTableCell>
            <StyledTableCell align="center">Salida</StyledTableCell>
            <StyledTableCell align="center">Operaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {anotaciones.map(anotacion => (
            <StyledTableRow key={anotacion._id}>
              <StyledTableCell align="center">{maquinas.find(maquina => maquina._id === anotacion.maquina)?.nombreMaquina}</StyledTableCell>
              <StyledTableCell align="center">{anotacion.entrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</StyledTableCell>
              <StyledTableCell align="center">{anotacion.salida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</StyledTableCell>
              <StyledTableCell align="center" >
                <Link  href={`/inicio/anotaciones/${anotacion.maquina}`}> <EditButton component="a"> <EditIcon />  Editar</EditButton></Link>
                {/* <Link href={""}>Borrar</Link> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
