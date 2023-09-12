import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexChart() {
  const [series] = useState([40, 20, 13]);
  const [options] = useState({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["In progress", "On Hold", "Pending"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
        fill: {
      colors: ['#00e396', '#008ffb', '#feb019']
    },
    
    colors:['#00e396', '#008ffb', '#feb019']
  });
  return (
    <>
    <div className="chart__box py-2 px-1">
    <h6 className="text-center">Projects Status</h6>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={420}
        />
      </div>
    </div>
    </>
  );
}

//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);
