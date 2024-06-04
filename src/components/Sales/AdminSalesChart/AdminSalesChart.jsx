import React from "react";
import ReactApexChart from "react-apexcharts";

const AdminSalesChart = ({ 
  sales, 
  monthKey, 
  keyName, 
  dataKey, 
  lineColor 
}) => {
  // 월의 숫자를 영어로 변환하는 함수
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  };

  const series = [
    {
      name: keyName,
      type: "line", // 그래프 선으로 설정
      data: sales.map((data) => data[dataKey]),
    },
  ];
  console.log(sales.map((data) => data[dataKey]));

  const options = {
    chart: {
      height: 200,
      type: "line",
      zoom: {
        enabled: false,
      },
      
    },
    stroke: {
      width: [4], // 선의 두께 설정
      curve: "smooth", // 부드러운 곡선으로 연결
    },
    title: {
      text: keyName,
      align: "left",
      style: {
        fontSize: "20px", // 제목 글씨체 크기
        fontWeight: "bold",
      },
    },
    markers: {
      size: 6, // 점의 크기 설정
      colors: [lineColor], // 점의 색상 설정
      strokeColors: "#fff", // 점의 테두리 색상 설정
      strokeWidth: 1, // 점의 테두리 두께 설정
      hover: {
        size: 7, // 마우스 오버 시 점의 크기 설정
      },
    },
    xaxis: {
      categories: sales.map((data) => getMonthName(data[monthKey])),
      labels: {
        style: {
          fontSize: "18px", // x축 레이블 글씨체 크기
        },
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            fontSize: "20px", // y축 레이블 글씨체 크기
          },
        },
      },
    ],
    
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
    },
    fill: {
      opacity: [0.85, 1],
    },
    colors: [lineColor],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default AdminSalesChart;
