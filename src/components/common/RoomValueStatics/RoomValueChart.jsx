import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";

import DarkModeContext from "../../Contexts/DarkModeContext";
import { CHART_COLORS } from "../../../lib/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);
export default function RoomValueChart({ chartsData, dataLvls }) {
  const darkMode = useContext(DarkModeContext);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    // lineTension: 0.4,
    scales: {
      x: {
        grid: {
          color: darkMode.theme === "light" ? "#E3E4FE" : "#a7a9b533",
          lineWidth: 2,
          drawBorder: true,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },

      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: darkMode.theme === "light" ? "#E3E4FE" : "#a7a9b533",
          lineWidth: 2,
          drawBorder: true,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
        ticks: {
          callback(value) {
            return `$ ${value}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: [2],
        // hoverRadius: 6,
      },
    },
  };
  const labels = dataLvls;
  let width;
  let height;
  let gradient;
  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (gradient === null || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, "rgba(83, 86, 251,1)");
      gradient.addColorStop(0.5, "rgba(195, 66, 249,1)");
      gradient.addColorStop(1, "rgba(245, 57, 248,1)");
    }

    return gradient;
  }
  const data = {
    labels,
    datasets: chartsData.map((o, i) => {
      return {
        label: o.label,
        data: o.data,
        // borderColor(context) {
        //   const { chart } = context;
        //   const { ctx, chartArea } = chart;

        //   if (!chartArea) {
        //     // This case happens on initial chart load
        //     return null;
        //   }
        //   return getGradient(ctx, chartArea);
        // },
        borderColor: CHART_COLORS[i],
        fill: true,
        backgroundColor: () => {
          const charts = document.getElementById("chart").getContext("2d");
          const gradients = charts.createLinearGradient(0, 0, 0, 550);
          gradients.addColorStop(0, CHART_COLORS[i]);
          gradients.addColorStop(1, "rgba(83, 86, 251, 0.01)");

          return gradients;
        },
        borderWidth: 1,
        pointBackgroundColor: CHART_COLORS[i],
        // pointBackgroundColor(context) {
        //   const { chart } = context;
        //   const { ctx, chartArea } = chart;

        //   if (!chartArea) {
        //     // This case happens on initial chart load
        //     return null;
        //   }
        //   return getGradient(ctx, chartArea);
        // },
      };
    }),
  };
  return <Line options={options} data={data} />;
}
