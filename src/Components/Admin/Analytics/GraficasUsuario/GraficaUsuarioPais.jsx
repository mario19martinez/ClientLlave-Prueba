// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export default function GraficaUsuarioPais() {
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
    if (!chartRef.current) return;

    // Count users by country
    const userCountByCountry = userData.reduce((acc, user) => {
      acc[user.pais] = (acc[user.pais] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for chart
    const countries = Object.keys(userCountByCountry);
    const userCounts = Object.values(userCountByCountry);

    // Destroy previous chart if exists
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    // Draw chart
    const ctx = chartRef.current.getContext("2d");
    chartRef.current.chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: countries,
        datasets: [
          {
            label: "Usuarios por país",
            data: userCounts,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
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
              text: "País",
            },
          },
        },
      },
    });
  }, [userData]);

  return (
    <div>
      <h1>Usuarios por País</h1>
      <canvas ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
}