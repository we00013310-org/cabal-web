import PropTypes from "prop-types";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import DarkModeContext from "../Contexts/DarkModeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
export default function MarketHistoryChart({
  dataLvl = [],
  datasetOne = [],
  datasetTwo = [],
}) {
  const darkMode = useContext(DarkModeContext);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    lineTension: 0.4,
    scales: {
      x: {
        grid: {
          color: darkMode.theme === "light" ? "#E3E4FE" : "#a7a9b533",
          lineWidth: 2,
          drawBorder: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
        ticks: {
          callback(value) {
            return `${value}%`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: [0, 0, 6, 0, 0, 0, 0, 0],
        hoverRadius: 6,
      },
    },
  };
  const labels = dataLvl;
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datasetOne,
        // data: [10, -30, 50, -70, 90, -10, 30, -50, 70, -90],
        borderColor: "#FFAB33",
        backgroundColor: "#FFAB33",
        borderWidth: 4,
        pointBorderColor: "#ffffff",
        pointBackgroundColor: "#FFAB33",
        pointBorderWidth: 3,
        pointHoverBorderWidth: 3,
      },
      {
        label: "Dataset 2",
        data: datasetTwo,
        // data: [-20, 40, -60, 80, -90, 20, -40, 60, -80, 90],
        borderColor: "#ffee99",
        backgroundColor: "#ffee99",
        borderWidth: 4,
        pointBorderColor: "#ffffff",
        pointBackgroundColor: "#ffee99",
        pointBorderWidth: 3,
        pointHoverBorderWidth: 3,
      },
    ],
  };
  return <Line options={options} data={data} />;
}

MarketHistoryChart.propTypes = {
  dataLvl: PropTypes.array,
  datasetOne: PropTypes.array,
  datasetTwo: PropTypes.array,
};
