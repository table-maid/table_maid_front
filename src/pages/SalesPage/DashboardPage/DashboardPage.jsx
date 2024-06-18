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
import { Link, useNavigate } from "react-router-dom";
import Image from "../../../file.png";
import { searchMenuListRequest } from "../../../apis/api/menuManagentApi";
import { IoMdTrophy } from "react-icons/io";

function DashboardPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [selectSalesData, setSelectSalesData] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [topMenu, setTopMenu] = useState(null);
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
        const topMenuId = Object.keys(menuCounts).reduce(
          (a, b) => (menuCounts[a] > menuCounts[b] ? a : b),
          null
        ); //menuId를 배열로 변환 -> 가장 큰 count값 가진 menuId 반환
        if (topMenuId) {
          const topMenuItem = menuList.find(
            (menu) => menu.menuId === parseInt(topMenuId)
          ); // menuList에서 topMenuId와 일치하는 메뉴 찾은 뒤 정수로 변환
          if (topMenuItem) {
            setTopMenu({ ...topMenuItem, count: menuCounts[topMenuId] }); // topMenuItem에 count 값 추가 -> topMenu 상태로 설정(주간 판매량 가장 많은 메뉴)
          }
        } else {
          setTopMenu(null);
        }
      };
      fetchTopMenu(); // 판매량 가장 많은 메뉴 계산
    }
  }, [menuList, adminId, topMenu]);

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
                <h3>Weekly</h3>
                <button onClick={handleClick} css={s.button}>ALL</button>
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
                <h3>One Month</h3>
                <button onClick={handleClick} css={s.button}>ALL</button>
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
            <div css={s.menuBox}>
              <h1>
                <IoMdTrophy size={"35"} /> Weekly Top 1
              </h1>
              {topMenu ? (
                <div css={s.menu}>
                  <h2>{topMenu.menuName}</h2>
                  <img src={topMenu.menuImgUrl} alt={topMenu.menuName} />
                </div>
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
