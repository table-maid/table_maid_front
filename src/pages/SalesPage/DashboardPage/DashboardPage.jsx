/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";
import { useState, useEffect } from "react";
import {
  getMenuTotalSalesRequest,
  getSelectSalesRequest,
} from "../../../apis/api/salesApi";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import useSalesData from "../../../hooks/useSalesData";
import { useRecoilState } from "recoil";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Image from "../../../817729.png";
import { searchMenuListRequest } from "../../../apis/api/menuManagentApi";
import { FaMedal } from "react-icons/fa";
import SalesList from "../../../components/Sales/SalesList/SalesList";

function DashboardPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [selectSalesData, setSelectSalesData] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [topMenus, setTopMenus] = useState([]);
  const navigate = useNavigate();

  const { oneWeekData, lastMonthData, dailySales } =
    useSalesData(selectSalesData);

  const handleClick = () => {
    navigate("/sales/sale");
  };

  const selectSalesQuery = useQuery(
    ["selectSalesQuery"],
    () => getSelectSalesRequest(adminId),
    {
      retry: 0,
      onSuccess: (response) => {
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
        setMenuList(response.data);
      },
      onError: (error) => {
        console.log("에러 :", error);
      },
    }
  );

  useEffect(() => {
    if (menuList.length > 0) {
      const fetchTopMenu = async () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        let menuCounts = {};

        for (const menu of menuList) {
          // menuId로 menuList에 있는 판매 데이터 가져옴
          const response = await getMenuTotalSalesRequest({
            adminId: adminId,
            menuId: menu.menuId,
          });

          if (response && response.data) {
            const data = response.data;
            const count = data.reduce((acc, curr) => acc + curr.count, 0);
            menuCounts[menu.menuId] = count;
          }
        }
        const sortedMenuIds = Object.keys(menuCounts).sort(
          (a, b) => menuCounts[b] - menuCounts[a]
        );

        const top3Menus = sortedMenuIds.slice(0, 3).map((menuId) => {
          const menuItem = menuList.find(
            (menu) => menu.menuId === parseInt(menuId)
          );
          return { ...menuItem, count: menuCounts[menuId] };
        });

        setTopMenus(top3Menus);
      };
      fetchTopMenu(); // 판매량 가장 많은 메뉴 계산
    }
  }, [menuList, adminId, topMenus]);

  return (
    <AdminPageLayout>
      <div css={s.saleLayout}>
        <div css={s.saleContainer}>
          <div css={s.saleGraphContainer}>
            <div css={[s.graphBox, s.firstGraphBox]}>
              <h1>Today</h1>
              <div css={s.imgLayout}>
                {/* <input type="file" name="" id="" /> */}
                <img src={Image} alt="" css={s.img} />
              </div>
              <div css={s.sales}>
                <h2>Total</h2>
                <h1>{dailySales} 원</h1>
              </div>
            </div>
            <div css={s.graphBox}>
              <div css={s.link}>
                <h3>Weekly</h3>
                <button onClick={handleClick} css={s.button}>
                  ALL
                </button>
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
                lineColor={"#3842ca"}
                height={"275px"}
                width={"400px"}
              />
            </div>
            <div css={s.graphBox}>
              <div css={s.link}>
                <h3>Month</h3>
                <button onClick={handleClick} css={s.button}>
                  ALL
                </button>
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
            <div css={s.listBox}>
              {oneWeekData.length > 4 ? (
                <SalesList salesData={oneWeekData} viewType="limited" css={s.list} />
              ) : (
                <SalesList salesData={oneWeekData} viewType="all" css={s.list} />
              )}
            </div>
            <div css={s.menuBox}>
              <h1>Weekly Top 3</h1>
              {topMenus.length > 0 ? (
                topMenus.map((menu, index) => (
                  <div key={menu.menuId} css={s.menu(index)}>
                    <h2>
                      <FaMedal />
                      {menu.menuName}
                    </h2>
                  </div>
                ))
              ) : (
                <p>데이터가 존재하지 않습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}

export default DashboardPage;
