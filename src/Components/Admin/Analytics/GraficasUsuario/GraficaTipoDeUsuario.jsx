// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export default function GraficaTipoDeUsuario() {
  const [userData, setUserData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || userData.length === 0) return;

    // Count users by user type
    const userCountByType = userData.reduce((acc, user) => {
      const userType = user.rol;
      acc[userType] = (acc[userType] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for chart
    const types = Object.keys(userCountByType);
    const userCounts = Object.values(userCountByType);

    // Define colores para cada tipo de usuario
    const backgroundColors = {
      admin: "rgba(54, 162, 235, 0.6)", // Azul para administradores
      docente: "rgba(153, 102, 255, 0.6)", // Morado para docentes
      client: "rgba(75, 192, 192, 0.6)", // Verde para usuarios
    };

    // Draw chart
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "pie", // Cambiar el tipo de gráfico a "pie"
      data: {
        labels: types,
        datasets: [
          {
            label: "Usuarios por Tipo",
            data: userCounts,
            backgroundColor: types.map((type) => backgroundColors[type]),
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Número de Usuarios",
            },
          },
          x: {
            title: {
              display: true,
              text: "Tipo de Usuario",
            },
          },
        },
      },
    });
  }, [userData]);

  return (
    <div>
      <h1>Usuarios por Tipo de Usuario</h1>
      <canvas ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
}