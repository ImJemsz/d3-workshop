import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];

const data = {
  labels,
  datasets: [
    {
      label: "uv",
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      label: "pv",
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const ChartJsBarChart = () => {
  return <Bar options={options} data={data} />;
};

export default ChartJsBarChart;
