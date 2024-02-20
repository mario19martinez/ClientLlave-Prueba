// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export default function GraficaFechaDeRegistro() {
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

    // Count users by registration date
    const userCountByDate = userData.reduce((acc, user) => {
      const registrationDate = user.registeredAt
        ? new Date(user.registeredAt).toDateString()
        : "Sin fecha";
      acc[registrationDate] = (acc[registrationDate] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for chart
    const dates = Object.keys(userCountByDate);
    const userCounts = Object.values(userCountByDate);

    // Draw chart
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Usuarios por día de registro",
            data: userCounts,
            backgroundColor: "rgba(255, 99, 132, 0.6)", // Cambia el color aquí
            borderColor: "rgba(255, 99, 132, 1)", // Cambia el color aquí
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
              text: "Fecha de Registro",
            },
          },
        },
      },
    });
  }, [userData]);

  return (
    <div>
      <h1>Usuarios por Fecha de Registro</h1>
      <canvas ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
}