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
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";

import DarkModeContext from "../Contexts/DarkModeContext";

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

export default function MarketVisitorAnalytic({ datasets, dataLvls }) {
  const darkMode = useContext(DarkModeContext);
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
  };
  const LineChartData = {
    labels: dataLvls,
    datasets: [
      {
        label: "First dataset",
        data: datasets,
        // data: [50, 30, 100, 20, 50, 30, 100, 20],
        fill: true,
        backgroundColor:
          darkMode.theme === "light"
            ? "rgb(250, 236, 254)"
            : " rgba(245, 57, 248, 0.1)",
        borderColor: "#D040F9",
        pointBorderColor: "#AE8FF7",
        pointBackgroundColor: "#ffffff",
        pointRadius: 5,
        pointHoverRadius: 5,
        borderWidth: 5,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 5,
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

MarketVisitorAnalytic.propTypes = {
  datasets: PropTypes.array,
  dataLvls: PropTypes.array,
};
