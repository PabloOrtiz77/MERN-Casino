"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import BalanceIcon from '@mui/icons-material/AccountBalance';
import NoteIcon from '@mui/icons-material/Note';
import RecordIcon from '@mui/icons-material/PlaylistAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export default function Navbar() {
  const router=useRouter()
  const CerrarSesion=async()=>{
    const confirmDelete = window.confirm("¿Estás seguro de Cerrar Sesion?");
  
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/user/session`, { withCredentials: true }
          
        );
        const result = await response.data;
        console.log(result); //si todo salio bien hay que setear los estados
        router.push("/")
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        p: 1
      }}
    >
      <Link href={"/inicio"} style={{ textDecoration: "none", color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
        <HomeIcon sx={{ mr: 1 }} />
        Inicio
      </Link>
      <Link href={"/inicio/balance"} style={{ textDecoration: "none", color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
        <BalanceIcon sx={{ mr: 1 }} />
        Balance
      </Link>
      <Link href={"/inicio/anotaciones"} style={{ textDecoration: "none", color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
        <NoteIcon sx={{ mr: 1 }} />
        Anotaciones
      </Link>
      <Link href={"/inicio/registros"} style={{ textDecoration: "none", color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
        <RecordIcon sx={{ mr: 1 }} />
        Registros
      </Link>
      <Button onClick={CerrarSesion} color="inherit">
        <ExitToAppIcon sx={{ mr: 1 }} />
        Logout
      </Button>
      </Stack>
      </AppBar>
    </Box>
  );
}