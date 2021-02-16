import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import Header from './Header/Header.js';
import Table from './Table/Table.js';

const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    scales: {
      xAxes: [{
        id: 'x',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontColor: "red"
        },
      }],
      yAxes: [{
        id: 'y',
        display: true,
        gridLines: {
          color: "black",
          borderDash: [2, 5],
        },
        ticks: { min: 0 },
        scaleLabel: {
          display: true,
          labelString: "Price",
          fontColor: "red"
        }
      }]
    }
  }
};


const Chart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [data, setData] = useState([]);

  const generateColor = () => Math.floor(Math.random()*256);

  const updateDataset = ({ type, x, y }) => {
    chartInstance.data.labels.push(x);
    chartInstance.data.labels = [...new Set(chartInstance.data.labels)].sort();

    const allNames = chartInstance.data.datasets.map(({ label }) => label);
    if (allNames.includes(type)) {
      chartInstance.data.datasets.forEach((item) => {
        if (item.label === type) {
          item.data.push({ x, y });
        }
        return item;
      })
    } else {
      const color = `rgb(${generateColor()}, ${generateColor()}, ${generateColor()})`;
      chartInstance.data.datasets.push({
        label: type,
        data: [{ x, y }],
        borderColor: color,
        pointBackgroundColor: color,
        backgroundColor: 'transparent',
        pointRadius: 10,
      })
    }
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.data.labels = [];
      chartInstance.data.datasets = [];
      data.forEach((item) => updateDataset(item))
      chartInstance.update();
    }
  }, [data]);

  return (
    <>
      <Header />
      <canvas className="canvas" ref={chartContainer} />
      <Table data={data} setData={setData}/>
    </>
  );
};

export default Chart;
