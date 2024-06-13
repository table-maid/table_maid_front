/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { getMenuTotalSalesRequest } from "../../../apis/api/salesApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import SalesModal from "../../../components/Sales/SalesModal/SalesModal";

function MenuSalesPage(props) {
  const [adminId, setAdminId] = useState(1);
  const [sales, setSales] = useState([]);
  const [viewType, setViewType] = useState("");
  const [dataKey, setDataKey] = useState("menuTotalSales"); 
  const { menuId } = useParams();

  useEffect(() => {
    console.log(menuId);
  }, [menuId]);

  const selectSalesQuery = useQuery(
    "selectSalesQuery",
    () =>
      getMenuTotalSalesRequest({
        adminId: adminId,
        menuId: menuId,
      }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log(response.data);
        setSales(response.data);
      },
      onError: (error) => {
        console.log("에러 :", error);
      },
    }
  );

  const handleViewChange = (show) => {
    setViewType(show);
  };

  const handleDataKeyChange = (key) => {
    setDataKey(key);
  };

  // 월별 데이터 합치기
  const addMonthData = (data) => {
    const addData = data.reduce((acc, curr) => {
      const month = curr.month;
      if (!acc[month]) {
        acc[month] = {
          month: month,
          menuTotalSales: 0,
          count: 0,
        };
      }
      acc[month].menuTotalSales += curr.menuTotalSales;
      acc[month].count += curr.count;
      return acc;
    }, {});

    return Object.values(addData);
  };

  const searchSales = viewType === "monthly" ? addMonthData(sales) : sales;

  return (
    <SalesModal>
      <div>
        <div css={s.buttonContainer}>
          <button css={s.button} onClick={() => handleViewChange("monthly")}>
            월별
          </button>
          <button css={s.button} onClick={() => handleViewChange("daily")}>
            일별
          </button>
          <button css={s.button} onClick={() => handleDataKeyChange("menuTotalSales")}>
            총 매출
          </button>
          <button css={s.button} onClick={() => handleDataKeyChange("count")}>
            갯수
          </button>
        </div>
        <AdminSalesChart
          sales={searchSales.map((data) => ({
            menuTotalSales: data.menuTotalSales,
            count: data.count,
            month: data.month,
            day: data.day,
          }))}
          monthKey={"month"}
          dayKey={"day"}
          keyName={viewType === "monthly" ? "월별" : "일별"}
          dataKey={dataKey}
          lineColor={"#ff7300"}
          viewType={viewType}
        />
      </div>
    </SalesModal>
  );
}

export default MenuSalesPage;
