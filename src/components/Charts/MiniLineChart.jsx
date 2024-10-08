/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
/* eslint-disable vars-on-top */
/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  {
    id: "lineChart",
  }
);

export default function MiniLineChart({
  datasets = [],
  label = "First dataset",
  color = "#FFAB33",
}) {
  const lineChartOptions = {
    type: "line",
    responsive: true,
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
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },
    },
    maintainAspectRatio: false,
    lineTension: 0.5,
    elements: {
      point: {
        radius: [0, 0, 4, 0],
        hoverRadius: 6,
      },
    },
  };
  const LineChartData = {
    labels: ["12AM", "4PM", "1.00AM", "2.00AM"],
    datasets: [
      {
        label,
        data: datasets,
        fill: true,
        backgroundColor: () => {
          const chart = document.getElementById("chart").getContext("2d");
          const gradient = chart.createLinearGradient(0, 0, 0, 450);
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.3, "rgba(83, 86, 88, 0.01)");

          return gradient;
        },
        borderColor: color,
        pointBackgroundColor: color,
      },
      // {
      //   label: 'Data One',
      //   backgroundColor: '#f87979',
      //   data: [this.getRandomInt(), this.getRandomInt()]
      // }
    ],
  };
  const plugins = [{}];
  return (
    <Line
      id="chart"
      options={lineChartOptions}
      data={LineChartData}
      plugins={plugins}
    />
  );
}

MiniLineChart.propTypes = {
  datasets: PropTypes.array,
};
