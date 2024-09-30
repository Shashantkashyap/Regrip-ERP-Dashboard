import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

// Line Chart Data
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Matches the months in the screenshot
  datasets: [
    {
      label: "Count",
      data: [300, 250, 400, 116, 350, 420], // Your actual data
      fill: true,
      backgroundColor: "rgba(0, 123, 255, 0.1)", // Light blue shade for the area
      borderColor: "#007bff", // Blue line
      borderWidth: 4, // Make the line thicker
      pointBackgroundColor: "#007bff", // Blue points
      pointBorderColor: "#fff", // White border around points
      pointHoverBackgroundColor: "#fff", // White hover effect
      pointHoverBorderColor: "#007bff", // Blue border on hover
      pointRadius: 6, // Bigger points
      pointHoverRadius: 8, // Bigger points on hover
      pointBorderWidth: 3, // Border around the points
      tension: 0.4, // Smooth curves
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltip
      titleFont: { weight: 'bold' }, // Bold title in tooltip
      callbacks: {
        label: function (context) {
          return `${context.raw} Count`; // Display count in tooltip
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 500, // Maximum value for the y-axis
      ticks: {
        stepSize: 100, // Set y-axis intervals at 100
        callback: function (value) {
          return value; // Show actual value without modification
        },
      },
      grid: {
        borderDash: [8, 4], // Dashed grid lines for y-axis
        color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
      },
    },
    x: {
      grid: {
        display: false, // Hide grid lines on x-axis
      },
    },
  },
};

const LineChart = () => {
  return (
    <Line data={lineData} options={lineOptions} />
  );
};

export default LineChart;
