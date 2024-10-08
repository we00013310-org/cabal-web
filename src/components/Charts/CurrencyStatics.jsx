import PropTypes from "prop-types";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
export default function CurrencyStatics({
  datasetsLtc = [],
  datasetsBtc = [],
  datasetsEth = [],
  dataLabels = [],
}) {
  const options = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          //   display: false,
          drawBorder: false,
        },
        ticks: {
          callback(value) {
            return `${value}%`;
          },
        },
      },
    },
  };
  const labels = dataLabels;
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datasetsLtc,
        borderColor: "#FFAB33",
        backgroundColor: "#FFAB33",
        borderWidth: 5,
      },
      {
        label: "Dataset 2",
        data: datasetsBtc,
        // data: [4, 14, 20, 34, 40, 90, 60, 75, 80, 95],
        borderColor: "#ffee99",
        backgroundColor: "#ffee99",
        borderWidth: 5,
      },
      {
        label: "Dataset 3",
        data: datasetsEth,
        // data: [3, 17, 23, 40, 53, 60, 73, 80, 93],
        borderColor: "#F2994A",
        backgroundColor: "#F2994A",
        borderWidth: 5,
      },
    ],
  };
  return <Line options={options} data={data} />;
}

CurrencyStatics.propTypes = {
  datasetsLtc: PropTypes.array,
  datasetsBtc: PropTypes.array,
  datasetsEth: PropTypes.array,
  dataLabels: PropTypes.array,
};
