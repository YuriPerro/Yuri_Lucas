import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  const { data } = props;

  const chartData = useMemo(() => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: "Resultado",
          data: data.values,
          backgroundColor: ["rgb(74, 135, 235)", "rgb(228, 68, 68)"],
          hoverBackgroundColor: ["rgba(60, 117, 209, 0.8)", "rgba(228, 68, 68, 0.8)"],
          borderColor: ["#fff", "#fff"],
          borderWidth: 2,
        },
      ],
      options: {
        legend: { display: false },
      },
    };
  }, [data]);

  return (
    <div className="max-w-md w-full mb-8">
      <Pie data={chartData} options={{ plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default PieChart;
