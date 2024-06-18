/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";
import { useState, useEffect } from "react";
import { getSelectSalesRequest } from "../../../apis/api/salesApi";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import useSalesData from "../../../hooks/useSalesData";
import { useRecoilState } from "recoil";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Image from "../../../file.png";
import { searchMenuListRequest } from "../../../apis/api/menuManagentApi";
function DashboardPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [selectSalesData, setSelectSalesData] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const { oneWeekData, lastMonthData, dailySales } =
    useSalesData(selectSalesData);

  const selectSalesQuery = useQuery(
    ["selectSalesQuery"],
    () => getSelectSalesRequest(adminId),
    {
      retry: 0,
      onSuccess: (response) => {
		  console.log(response.data);
        setSelectSalesData(response.data);
      },
      onError: (error) => {
        console.log("에러 : ", error);
      },
    }
  );

  const selectMenuListQuery = useQuery(
    ["selectMenuListQuery"],
    () => searchMenuListRequest(adminId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
		console.log(response.data);
        setMenuList(response.data);
      },
      onError: (error) => {
        console.log("에러 : ", error);
      },
    }
  );

  return (
    <AdminPageLayout>
      <div css={s.saleLayout}>
        <div css={s.saleContainer}>
          <div css={s.saleGraphContainer}>
            <div css={[s.graphBox, s.firstGraphBox]}>
              <h1>Today</h1>
              <div css={s.imgLayout}>
                <img src={Image} alt="" css={s.img} />
              </div>
              <div css={s.sales}>
                <h2>Total</h2>
                <h1>{dailySales} 원</h1>
              </div>
            </div>
            <div css={s.graphBox}>
              <div css={s.link}>
                <h3>One Week</h3>
                <Link>fsdf</Link>
              </div>
              <AdminSalesChart
                sales={oneWeekData.map((data) => ({
                  dayTotalSales: data.dayTotalSales,
                  month: data.month,
                  day: data.day,
                }))}
                monthKey={"month"}
                dayKey={"day"}
                dataKey={"dayTotalSales"}
                viewType={"week"}
                lineColor={"#9bd300"}
                height={"275px"}
                width={"400px"}
              />
            </div>
            <div css={s.graphBox}>
              <div css={s.link}>
                <h3>One Month</h3>
                <Link>fsdf</Link>
              </div>
              <AdminSalesChart
                sales={lastMonthData.map((data) => ({
                  dayTotalSales: data.dayTotalSales,
                  month: data.month,
                  day: data.day,
                }))}
                monthKey={"month"}
                dayKey={"day"}
                dataKey={"dayTotalSales"}
                viewType={"week"}
                lineColor={"#ffb413"}
                height={"275px"}
                width={"400px"}
              />
            </div>
          </div>
          <div css={s.menuLayout}>
            <div css={s.listBox}>리스트</div>
            <div css={s.menuBox}>주간 no1 메뉴</div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}

export default DashboardPage;
