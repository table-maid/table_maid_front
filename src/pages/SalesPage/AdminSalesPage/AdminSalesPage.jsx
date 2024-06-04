/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getSalesRequest } from "../../../apis/api/salesApi";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";

function AdminSalesPage(props) {
  const [sales, setSales] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    setSalesData(() =>
      sales.map((data) => ({
        totalSales: data.totalSales,
        month: data.month,
      }))
    );
  }, [sales]);

  const salesQuery = useQuery(["salesQuery"], getSalesRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      console.log("Sales API Response:", response.data);
      setSales(response.data);
    },
    onError: (error) => {
      console.log("salesQuery Error:", error);
    },
  });

  console.log(sales.map((data) => data.totalSales));

  return (
    <div css={s.layout}>
      <h1>Sales Data</h1>
      <div css={s.chartContainer}>
        <AdminSalesChart
          sales={salesData}
          monthKey={"month"}
          keyName={"총 매출"}
          dataKey={"totalSales"}
          lineColor={"#ff7300"}
        />
      </div>
    </div>
  );
}

export default AdminSalesPage;
