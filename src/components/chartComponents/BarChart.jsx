import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Filler,
    ArcElement,  // Import ArcElement
  } from "chart.js";
  import { Line, Bar, Doughnut } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend,
    BarElement,
    ArcElement  // Register ArcElement
  );
  

const barData = {
  labels: [
    "Manufacturing Defects",
    "Driver Negligence",
    "Fitter Part",
    "Service Engineer/ Supervisor Part",
    "Repor",
  ],
  datasets: [
    {
      label: "Count",
      fill: true,
      data: [300, 116, 400, 350, 370],
      backgroundColor: [
        "#E08D3A",
        "#E08D3A",
        "#E08D3A",
        "#E08D3A",
        "#E08D3A",
      ],
    },
  ],
};

const barOptions = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const percentage = ((context.raw / 400) * 100).toFixed(2);
          return `${context.raw} (${percentage}%)`;
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
  elements: {
    bar: {
      borderRadius: 10,  // Add borderRadius for rounding
    },
  },
};

const BarChart = () => {
  return (
    <Bar data={barData} options={barOptions} />
  );
};

export default BarChart;

