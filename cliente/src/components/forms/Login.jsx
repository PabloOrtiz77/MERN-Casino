"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Fragment, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';


const defaultTheme = createTheme();

export default function Login() {
    const router=useRouter()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errores,setErrores]=useState("")

    const handleLogin=async()=>{
        const data={
            email,
            password,}
        try {
            const response=await axios.post(`${process.env.REACT_APP_API_DOMAIN}/user/session`,data,{withCredentials:true})
            const result=await response.data
            console.log(result)
            setErrores({})
            router.push('/inicio')
        } catch (error) {
            console.log(error.response.data.errors)
            setErrores(error.response.data.errors)
        }
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 18,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'dodgerblue' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Bienvenido
                </Typography>
            </div>
            <Box sx={{ mt: 1 ,display:"flex",flexDirection:"column" }}>
            <TextField label="email" 
                    name="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    error={Boolean(errores.email)}
                    helperText={errores.email?.message}
                    sx={{mb:"10px"}}
                    /> 
                    
                   
                <TextField label="password" 
                    name="password"
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                    error={Boolean(errores.password)}
                    helperText={errores.password?.message}
                    type='password'
                    autoComplete="false"
                    />
            <Button variant="contained" 
            onClick={handleLogin} 
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            >Iniciar Sesión</Button>
            
            <Grid container>
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"¿No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
