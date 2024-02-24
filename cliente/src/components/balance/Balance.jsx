"use client"
import React, { useEffect, useState } from 'react';
import { Container, Paper, Stack, Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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


function Balance() {
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState('');
  const [entrada, setEntrada] = useState('');
  const [salida, setSalida] = useState('');
  const[Gastos,setGastos]=useState(0)
  const[notas,setNotas]=useState('')
  const [fecha,setFecha]=useState('')
  const [maquinas, setMaquinas] = useState([]);
  const [findmaquinas, setFindmaquinas] = useState([]);
  const [anotaciones, setAnotaciones] = useState([]);
  const [resultado,setResultado]=useState(0)
  const [maquianotaciones,setMaquianotaciones]=useState([])


    const findMaquinas= async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/maquinas", { withCredentials: true });
          const result = await response.data;
          setFindmaquinas(result);
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


      const handleAgregarMaquina = () => {
        if (maquinaSeleccionada !== '' && entrada !== '' && salida !== '') {
          // Agregar la nueva máquina a la lista maquinas
          setMaquinas([...maquinas, {_id: maquinaSeleccionada, nombreMaquina: maquinaSeleccionada, entrada: entrada, salida: salida }]);
        
          // Reiniciar los estados para agregar una nueva máquina
          setMaquinaSeleccionada('');
          setEntrada('');
          setSalida('');
        }
      };
      
      // useEffect para realizar acciones después de que maquinas se actualice
      useEffect(() => {
        if (maquinas.length > 0) {
            maquinas.map(maquina => {
                // Encuentra la máquina correspondiente en findmaquinas
                const maquinaEncontrada = findmaquinas.find(findmaquina => findmaquina._id === maquina._id);
                const anotacionesEncontrada = anotaciones.find(anotacion => anotacion.maquina === maquina._id);
                let calculo
                // Si la máquina se encuentra en findmaquinas, accede a la capacidad
                const capacidad = maquinaEncontrada?.capacidad;
                if (maquinaEncontrada.nombreMaquina === "Poker 1") {
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 10000;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 100;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                } 
                else if (maquinaEncontrada.nombreMaquina === "Poker 9") {
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 10000;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 100;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                } 
                else if (maquinaEncontrada.nombreMaquina === "Poker 11" ||maquinaEncontrada.nombreMaquina === "Poker 10") {
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 5000;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 50;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                } 
                else if (maquinaEncontrada.nombreMaquina === "Poker 14") {
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 10;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 100;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                } 
                else if (maquinaEncontrada.nombreMaquina === "Linea 1" || maquinaEncontrada.nombreMaquina === "Linea 2") {
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 100;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 1000;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                } 
                else if (maquinaEncontrada.nombreMaquina === "Linea 3" ) {
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 50;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 50;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                } 
                else if (capacidad === 50) {
                    const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 1000;

                    const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 50;
                    calculo=resultadoEntrada - resultadoSalida
                    setResultado(resultado+(calculo));
                }else if (capacidad === 100){
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 1000;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 100;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                }
                else if (capacidad === 10){
                  const resultadoEntrada = (parseInt(maquina.entrada) - parseInt(anotacionesEncontrada.entrada)) * 10;
                  const resultadoSalida = (parseInt(maquina.salida) - parseInt(anotacionesEncontrada.salida)) * 10;
                  calculo=resultadoEntrada - resultadoSalida
                  setResultado(resultado+(calculo));
                }
                setMaquianotaciones([...maquianotaciones,{_id:maquinaEncontrada._id,nombremaquina:maquinaEncontrada.nombreMaquina,entrada:maquina.entrada,salida:maquina.salida,resultado:calculo}]);
                console.log(maquinaEncontrada, anotacionesEncontrada);
            });
        }
    }, [maquinas]);
     // Se ejecutará cuando maquinas cambie
      
      

  const handleSubmit =async (event) => {
    event.preventDefault();
    // Aquí puedes procesar los datos de maquinas como desees
    if (!fecha || !Gastos) {
      alert('Por favor complete los campos requeridos');
      return; // Detener el envío del formulario si los campos requeridos no están completos
    }
    console.log('Datos de maquinas:', maquianotaciones);
     try {
            const data={
              Ingresos:resultado,
              Gastos,
              fecha,
              notas,
              maquinas:{maquianotaciones}
            }
            const response=await axios.post(`${process.env.REACT_APP_API_DOMAIN}/balance`,data,{withCredentials:true})
            const result=await response.data
            console.log(result)
        } catch (error) {
            console.log(error)
        }
   
    try {
      // Iterar sobre las anotaciones en el estado maquinas y actualizarlas una por una
      await Promise.all(maquianotaciones.map(async (maquina) => {
        const anotacionActualizada = {
          entrada: maquina.entrada,
          salida: maquina.salida
        };

        // Hacer la solicitud de actualización a la API utilizando el _id de la máquina
        await axios.put(`http://localhost:8000/api/anotaciones/${maquina._id}`, anotacionActualizada,{withCredentials:true});
      }));

      console.log('Anotaciones actualizadas con éxito');
      setMaquianotaciones([])
      setResultado(0)
      setMaquinas('');
      setEntrada('');
      setSalida('');
      setGastos('')
      setNotas('')
      setFecha('')
    } catch (error) {
      console.error('Error al actualizar las anotaciones:', error);
    }
  };

  const  handleCancelar=()=>{
    setResultado(0)
    setMaquinas('');
    setEntrada('');
    setSalida('');
  }

  return (
   <Container sx={{display:"flex", flexDirection:"row",columnGap:"10px"}} >
    
<Container sx={{ mt: "1em", display: "flex", flexDirection: "column", rowGap: "10px" }} maxWidth="lg">
  <Paper sx={{ p: 3 }} elevation={4}>
    <form onSubmit={handleSubmit}>
      <Stack direction="row" sx={{ alignItems: "center", marginBottom: '20px' }} spacing={2}>
        <p>Ingrese Fecha: </p>
        <TextField
          type="date"
          value={fecha}
          required
          onChange={(e) => setFecha(e.target.value)}
        />
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", marginBottom: '20px' }}spacing={2}>
      <p>Ingrese Gastos: </p>
        <TextField
        //   label="Gastos"
          type="number"
          value={Gastos}
          onChange={(e) => setGastos(e.target.value)}
          required
        />
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", marginBottom: '20px' }}>
        <TextField
          label="Puedes agregar un comentario"
          type="text"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", marginBottom: '20px', justifyContent: 'center' }}>
        <p>Selecciona una maquina: </p>
        <Select
          value={maquinaSeleccionada}
          onChange={(e) => setMaquinaSeleccionada(e.target.value)}
          label="Selecciona una máquina"
          sx={{ minWidth: '150px' }} // ajusta el ancho mínimo según sea necesario
        >
          <MenuItem value="">Seleccione una máquina</MenuItem>
          {findmaquinas.map((valor) => (
            <MenuItem value={valor._id}>{valor.nombreMaquina}</MenuItem> 
            ))}
        </Select>
      </Stack>
      <Stack direction="row" sx={{ marginBottom: '20px' }} spacing={2}>
        <TextField
          label="Entrada"
          type="number"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        <TextField
          label="Salida"
          type="number"
          value={salida}
          onChange={(e) => setSalida(e.target.value)}
        />
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'center' }} spacing={2}>
        <Button variant="contained" onClick={handleAgregarMaquina}>Agregar</Button>
        <Button variant="contained" onClick={handleSubmit} color='success' type="submit">Guardar</Button>
        <Button variant="contained" onClick={handleCancelar} color='error' type="submit">Cancelar</Button>
      </Stack>
    </form>
  </Paper>
</Container>

      <Container sx={{mt:"1em" }} maxWidth="sm">
      <TableContainer component={Paper} sx={{maxWidth:"800px", m:"0px auto"}}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre Maquina</StyledTableCell>
            <StyledTableCell align="center">Entrada</StyledTableCell>
            <StyledTableCell align="center">Salida</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {maquinas.length > 0 && maquinas.map(maquina => (
            <StyledTableRow key={maquina._id}>
              <StyledTableCell align="center">{findmaquinas.find(findmaquina => findmaquina._id === maquina._id)?.nombreMaquina}</StyledTableCell>
              <StyledTableCell align="center">{maquina.entrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</StyledTableCell>
              <StyledTableCell align="center">{maquina.salida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
        <Container sx={{ mt: "1em"}}>
  <TableContainer component={Paper} sx={{ maxWidth: "100%", m: "0px auto" }}>
    <Table sx={{width:"200px"}} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Resultado Parcial GS</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
        <StyledTableCell align="center">{resultado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  </TableContainer>
</Container>

</Container> 

);
}

export default Balance;
