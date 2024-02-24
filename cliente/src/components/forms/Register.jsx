"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fragment, useState } from "react"
import axios from "axios"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errores, setErrores] = useState({})

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const data = {
      email,
      password,
      confirmPassword
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/user`, data)
      const result = await response.data
      console.log(result)
      setErrores({})
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.log(error.response.data.errors)
      setErrores(error.response.data.errors)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'dodgerblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <form onSubmit={handleRegister}> {/* Envolver el contenido en un formulario y manejar el evento submit */}
            <Box component="div" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    label="email"
                    name="email"
                    value={email}
                    required
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errores.email)}
                    helperText={errores.email?.message}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    label="password"
                    name="password"
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errores.password)}
                    helperText={errores.password?.message}
                    autoComplete="false"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={Boolean(errores.confirmPassword)}
                    helperText={errores.confirmPassword?.message}
                    autoComplete="false"
                    type='password'
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Registrar
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    ¿Ya tienes una cuenta? Iniciar sesión
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box >
      </Container>
    </ThemeProvider>
  );
}

export default Register;
