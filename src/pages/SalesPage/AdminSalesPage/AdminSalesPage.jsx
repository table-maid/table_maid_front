/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  getSalesRequest,
  getSelectSalesRequest,
} from "../../../apis/api/salesApi";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import useSalesData from "../../../hooks/useSalesData";
import { useRecoilState } from "recoil";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { viewTypeState } from "../../../atoms/ViewTypeStateAtom";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";
import useAnimateView from "../../../hooks/useAnimateAtom";
import SalesButtons from "../../../components/Sales/SalesButtons/SalesButtons";
import DateRangePicker from "../../../components/Sales/DatePicker/DateRangePicker";
import SalesListContainer from "../../../components/Sales/SalesListContainer/SalesListContainer";

function AdminSalesPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [sales, setSales] = useState([]);
  const [selectSalesData, setSelectSalesData] = useState([]);
  const [viewType, setViewType] = useRecoilState(viewTypeState);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalSales, setTotalSales] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredSalesData, setFilteredSalesData] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [dataKey, setDataKey] = useState("totalSales");
  const [chartData, setChartData] = useState([]);
  const [activeButton, setActiveButton] = useState("all");

  const [headerRef, headerInView] = useAnimateView();
  const [chartRef, chartInView] = useAnimateView();
  const [salesLayoutRef, salesLayoutInView] = useAnimateView();
  const [totalLayoutRef, totalLayoutInView] = useAnimateView();
  const [totalListRef, totalListInView] = useAnimateView();

  const {
    oneWeekData,
    lastMonthData,
    customTotalDay,
    oneWeekTotals,
    lastMonthTotals,
  } = useSalesData(selectSalesData);

  useEffect(() => {
    setViewType("all");
  }, []);

  const salesQuery = useQuery(["salesQuery"], () => getSalesRequest(adminId), {
    retry: 0,
    onSuccess: (response) => {
      setSales(response.data);
      if (viewType === "all") {
        setChartData(response.data);
        setTotalSales(
          response.data.reduce((acc, sale) => acc + sale.totalSales, 0)
        );
        setTotalCount(response.data.reduce((acc, sale) => acc + sale.count, 0));
        setDataKey("totalSales");
      }
    },
    onError: (error) => {
      console.log("에러 : ", error);
    },
  });

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

  useEffect(() => {
    let data = [];
    let totals = { totalSales: 0, totalCount: 0 };

    if (viewType === "week") {
      data = oneWeekData;
      totals = oneWeekTotals;
      setDataKey("dayTotalSales");
    } else if (viewType === "month") {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      const daysInMonth = [];
      for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
        daysInMonth.push(new Date(day));
      }

      const dataMap = lastMonthData.reduce((acc, sale) => {
        const saleDate = new Date(sale.year, sale.month - 1, sale.day).toISOString().split("T")[0];
        acc[saleDate] = sale;
        return acc;
      }, {});

      data = daysInMonth.map(day => {
        const dateKey = day.toISOString().split("T")[0];
        if (dataMap[dateKey]) {
          return dataMap[dateKey];
        } else {
          return { year: day.getFullYear(), month: day.getMonth() + 1, day: day.getDate(), dayTotalSales: 0, count: 0 };
        }
      });

      totals = {
        totalSales: data.reduce((acc, sale) => acc + sale.dayTotalSales, 0),
        totalCount: data.reduce((acc, sale) => acc + sale.count, 0),
      };
      setDataKey("dayTotalSales");
    } else if (viewType === "custom") {
      data = filteredSalesData;
      totals = {
        totalSales: filteredSalesData.reduce(
          (acc, sale) => acc + sale.dayTotalSales,
          0
        ),
        totalCount: filteredSalesData.reduce(
          (acc, sale) => acc + sale.count,
          0
        ),
      };
      setDataKey("dayTotalSales");
    } else if (viewType === "all") {
      data = sales;
      totals = {
        totalSales: sales.reduce((acc, sale) => acc + sale.totalSales, 0),
        totalCount: sales.reduce((acc, sale) => acc + sale.count, 0),
      };
      setDataKey("totalSales");
    }

    setTotalSales(totals.totalSales);
    setTotalCount(totals.totalCount);
    setChartData(data);
  }, [
    viewType,
    oneWeekTotals,
    lastMonthTotals,
    oneWeekData,
    lastMonthData,
    filteredSalesData,
    sales,
  ]);

  useEffect(() => {
    if (searchClicked) {
      const { totalSales, totalCount, filteredData } = customTotalDay(
        startDate,
        endDate
      );
      setFilteredSalesData(filteredData);
      setTotalSales(totalSales);
      setTotalCount(totalCount);
      setChartData(filteredData);
      setDataKey("dayTotalSales");
      setSearchClicked(false);
    }
  }, [searchClicked, startDate, endDate, customTotalDay]);

  const handleViewTypeChange = (type) => {
    setViewType(type);
    setActiveButton(type);
    if (type === "all") {
      setChartData(sales);
      setTotalSales(sales.reduce((acc, sale) => acc + sale.totalSales, 0));
      setTotalCount(sales.reduce((acc, sale) => acc + sale.count, 0));
      setDataKey("totalSales");
    }
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
    setActiveButton("search");
    setViewType("custom");
  };

  const isDisabled = startDate > endDate;

  const keyName =
    viewType === "all"
      ? "총 매출"
      : viewType === "week"
      ? "지난 7일"
      : viewType === "month"
      ? "저번달"
      : viewType === "custom"
      ? "조회"
      : "";

  return (
    <AdminPageLayout>
      <div css={s.layout}>
        <div
          css={s.header}
          ref={headerRef}
          className={headerInView ? "animate" : "hide"}
        >
          <div css={s.title}>매출 조회</div>
        </div>
        <div css={s.main}>
          <div
            css={s.chartContainer}
            ref={chartRef}
            className={chartInView ? "animate" : "hide"}
          >
            <AdminSalesChart
              sales={chartData.map((data) => ({
                dayTotalSales: data.dayTotalSales,
                totalSales: data.totalSales,
                month: data.month,
                day: data.day,
              }))}
              monthKey={"month"}
              dayKey={"day"}
              keyName={keyName}
              dataKey={dataKey}
              viewType={viewType}
              lineColor={"#0e76ff"}
            />
          </div>
          <div css={s.salesLayout}>
            <div
              css={s.selectBox}
              ref={salesLayoutRef}
              className={salesLayoutInView ? "animate" : "hide"}
            >
              <SalesButtons
                handleViewTypeChange={handleViewTypeChange}
                activeButton={activeButton}
              />
              <DateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                handleSearchClick={handleSearchClick}
                isDisabled={isDisabled}
                activeButton={activeButton}
              />
            </div>
            <div css={s.test}>
              <div
                css={s.totalLayout}
                ref={totalLayoutRef}
                className={totalLayoutInView ? "animate" : "hide"}
              >
                <div css={s.totalBox}>
                  <div css={s.box}>
                    <div css={s.total}>
                      <h1>매출 합계</h1>
                      <h1>주문 수 합계 </h1>
                    </div>
                    <div css={s.count}>
                      <h1>{totalSales} 원</h1>
                      <h1>{totalCount} 건</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                css={s.list}
                ref={totalListRef}
                className={totalListInView ? "animate" : "hide"}
              >
                <SalesListContainer
                  viewType={viewType}
                  oneWeekData={oneWeekData}
                  lastMonthData={lastMonthData}
                  filteredSalesData={filteredSalesData}
                  sales={sales}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}

export default AdminSalesPage;
