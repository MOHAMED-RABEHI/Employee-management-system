import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ managertotal, employeetotal, categorytotal }) => {
  const data = {
    labels: ["Managers", "Employees", "Categories"],
    datasets: [
      {
        label: "Count",
        data: [managertotal, employeetotal, categorytotal],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };
  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Dashboard Overview" },
  },
};


  return <div className="h-[300px] w-full"><Bar data={data} options={options} /></div>;
};


export default ChartComponent;