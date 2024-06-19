/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { getMenuTotalSalesRequest } from "../../../apis/api/salesApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import SalesModal from "../../../components/Sales/SalesModal/SalesModal";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useRecoilState } from "recoil";
import { IoChevronBack } from "react-icons/io5";

function MenuSalesPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [sales, setSales] = useState([]);
  const [viewType, setViewType] = useState("");
  const [dataKey, setDataKey] = useState("menuTotalSales");
  const { menuId } = useParams();
  const navigate = useNavigate();

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
        // console.log(response.data);
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
        <button onClick={() => navigate('/sales/menu')} css={s.backButton} ><IoChevronBack size={"50"}/></button>
        <div css={s.buttonContainer}>
          <div css={s.ChoiceContainer}>
            <button css={s.button} onClick={() => handleViewChange("monthly")}>
              월별
            </button>
            <button css={s.button} onClick={() => handleViewChange("daily")}>
              일별
            </button>
          </div>
          <div css={s.ChoiceContainer}>
            <button
              css={s.button}
              onClick={() => handleDataKeyChange("menuTotalSales")}
            >
              총 매출
            </button>
            <button css={s.button} onClick={() => handleDataKeyChange("count")}>
              갯수
            </button>
          </div>
        </div>
        <div css={s.chartContainer}>
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
            viewType={viewType}
            lineColor={"#f1c4ff"}
          />
        </div>
      </div>
    </SalesModal>
  );
}

export default MenuSalesPage;
