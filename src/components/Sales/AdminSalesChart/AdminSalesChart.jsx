/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";

const AdminSalesChart = ({
  sales,
  monthKey,
  dayKey,
  keyName,
  dataKey,
}) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
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

    const seriesData = sales.map((data) => data[dataKey]);

    let yMax;
    if (Math.max(...seriesData) === Math.min(...seriesData)) {
      // 모든 값이 동일한 경우 막대그래프로 표시
      setSeries([
        {
          name: keyName,
          type: "bar", 
          data: seriesData,
        },
      ]);
      yMax = Math.max(...seriesData) * 1.3;
    } else {
      setSeries([
        {
          name: keyName,
          type: "line",
          data: seriesData,
        },
      ]);
      yMax = Math.max(...seriesData) * 1.3;
    }

    setOptions({
      chart: {
        height: "100%",
        width: "100%",
        type: seriesData.length === 1 && Math.max(...seriesData) === Math.min(...seriesData) ? "bar" : "line",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      stroke: {
        width: [4],
        curve: "smooth",
      },
      title: {
        text: keyName,
        align: "center",
        style: {
          fontSize: "20px",
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: "14px",
          },
        },
        tickAmount: sales.length > 1 ? undefined : 2,
      },
      yaxis: [
        {
          min: 0,
          max: yMax,
          labels: {
            formatter: (val) => val.toFixed(0),
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
        type: "gradient",
        gradient: { gradientToColors: ["#a4fff3"], stops: [0, 100] },
      },
      colors: ["#c8dbff"],
      plotOptions: {
        bar: {
          columnWidth: "5%", 
        },
      },
      dataLabels: {
        enabled: false, 
      },
    });
  }, [sales, monthKey, dayKey, keyName, dataKey]);

  return (
    <div id="chart">
      {sales.length === 0 ? (
        <div css={s.dataLayout}>
          <div css={s.dataBox}>데이터가 존재하지 않습니다.</div>
        </div>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type={series[0]?.type || "line"}
          height={"380px"}
        />
      )}
    </div>
  );
};

export default AdminSalesChart;
