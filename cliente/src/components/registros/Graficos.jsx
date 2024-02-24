"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Graficos = ({ id }) => {
  const [registros, setRegistros] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  const obtenerRegistros = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/balance/${id}`, { withCredentials: true });
      const result = await response.data;
      console.log(result);
      console.log(result.maquinas[0].maquianotaciones);
      setMaquinas(result.maquinas[0].maquianotaciones);
      setRegistros(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{margin:5,textAlign:"center"}}>Informaciones</h1>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={maquinas}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombremaquina" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="resultado" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: '20px' }}>
        {maquinas.map((maquina, index) => (
          <Paper key={index} elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
            <Typography variant="h6">Nombre de la Máquina: {maquina.nombremaquina}</Typography>
            <Typography>Entrada: {maquina.entrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Typography>
            <Typography>Salida: {maquina.salida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Typography>
            <Typography>
            {maquina.resultado >= 0 ? "Ingresos" : "Egresos"}:{" "}
            {maquina.resultado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} GS
            </Typography>

          </Paper>
        ))}
      </div>

    </div>
  );
};

export default Graficos;

