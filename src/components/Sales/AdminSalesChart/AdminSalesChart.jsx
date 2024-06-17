/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactApexChart from "react-apexcharts";

const AdminSalesChart = ({
  sales,
  monthKey,
  dayKey,
  keyName,
  dataKey,
  lineColor,
  yAxisMax,
}) => {
  // 날짜를 지정된 형식으로 변환하는 함수
  const getDateLabel = (monthNumber, dayNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    if (dayNumber !== null && dayNumber !== undefined) {
      date.setDate(dayNumber);
    }
    return date.toLocaleString("en-US", { month: "short", day: "numeric" });
  };

  const categories = sales.map((data) =>
    getDateLabel(data[monthKey], data[dayKey])
  );

  const series = [
    {
      name: keyName,
      type: "line",
      data: sales.map((data) => data[dataKey]),
    },
  ];

  const options = {
    chart: {
      height: 200,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: { show: false },
    },
    stroke: {
      width: [4], // 선 굵기
      curve: "smooth",
    },
    title: {
      text: keyName,
      align: "center",
      style: {
        fontSize: "20px",
      },
    },
    markers: {
      size: 6,
      colors: [lineColor],
      strokeColors: "#fff",
      strokeWidth: 1,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    yaxis: [
      {
        min: 0,
        max: yAxisMax,
        labels: {
          formatter: (val) => val.toFixed(0), // 소수점자리 없애기
          style: {
            fontSize: "18px",
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
      {sales.length === 0 ? (
        <div css={s.dataLayout}>
          <div css={s.dataBox}>데이터가 존재하지 않습니다.</div>
        </div> // 데이터가 없을 때 표시
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={"380px"}
        />
      )}
    </div>
  );
};

export default AdminSalesChart;
