/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState, useCallback } from "react";
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
import { useSalesUtils } from "../../../hooks/useSalesUtils";

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

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

  const { fillMissingDays, aggregateMonthlyData, aggregateMonthlyDataForYear } = useSalesUtils();

  useEffect(() => {
    setViewType("all");
  }, []);

  const salesQuery = useQuery(["salesQuery"], () => getSalesRequest(adminId), {
    retry: 0,
    onSuccess: (response) => {
      const salesData = response.data;
      setSales(salesData);
      const uniqueYears = [...new Set(salesData.map((sale) => sale.year))];
      setYears(uniqueYears);
      if (viewType === "all") {
        setChartData(salesData);
        setTotalSales(salesData.reduce((acc, sale) => acc + sale.totalSales, 0));
        setTotalCount(salesData.reduce((acc, sale) => acc + sale.count, 0));
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

  const handleYearChange = useCallback((year) => {
    setSelectedYear(parseInt(year));
    setViewType("year");
    setActiveButton("year");
  }, []);

  useEffect(() => {
    if (viewType === "year") {
      const filteredYearData = sales.filter((sale) => sale.year === parseInt(selectedYear));
      const data = aggregateMonthlyDataForYear(filteredYearData, parseInt(selectedYear));
      const totals = {
        totalSales: data.reduce((acc, sale) => acc + sale.totalSales, 0),
        totalCount: data.reduce((acc, sale) => acc + sale.count, 0),
      };
      setFilteredSalesData(filteredYearData); // 연도별 데이터 설정
      setDataKey("totalSales");
      setTotalSales(totals.totalSales);
      setTotalCount(totals.totalCount);
      setChartData(data);
    }
  }, [selectedYear, sales, viewType, aggregateMonthlyDataForYear]);

  useEffect(() => {
    if (!searchClicked) return;

    let data = [];
    let totals = { totalSales: 0, totalCount: 0 };

    if (viewType === "week") {
      data = oneWeekData || [];
      totals = oneWeekTotals || { totalSales: 0, totalCount: 0 };
      setDataKey("dayTotalSales");
      if (oneWeekData.length > 0) {
        setStartDate(new Date(oneWeekData[0].year, oneWeekData[0].month - 1, oneWeekData[0].day));
        setEndDate(new Date(oneWeekData[oneWeekData.length - 1].year, oneWeekData[oneWeekData.length - 1].month - 1, oneWeekData[oneWeekData.length - 1].day));
      }
    } else if (viewType === "month") {
      const now = new Date();
      const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      const dailyData = fillMissingDays(firstDayOfLastMonth, lastDayOfLastMonth, lastMonthData);
      data = dailyData;

      totals = {
        totalSales: data.reduce((acc, sale) => acc + sale.dayTotalSales, 0),
        totalCount: data.reduce((acc, sale) => acc + sale.count, 0),
      };
      setDataKey("dayTotalSales");
      setStartDate(firstDayOfLastMonth);
      setEndDate(lastDayOfLastMonth);
    } else if (viewType === "custom") {
      const { totalSales, totalCount, filteredData } = customTotalDay(startDate, endDate);
      const monthlyData = aggregateMonthlyData(filteredData);
      data = monthlyData;
      totals = { totalSales, totalCount };
      setFilteredSalesData(filteredData);
      setDataKey("totalSales");
    } else if (viewType === "all") {
      data = sales || [];
      totals = {
        totalSales: data.reduce((acc, sale) => acc + (sale.totalSales || 0), 0),
        totalCount: data.reduce((acc, sale) => acc + (sale.count || 0), 0),
      };
      setDataKey("totalSales");
    }

    if (viewType !== "year") {
      setTotalSales(totals.totalSales);
      setTotalCount(totals.totalCount);
      setChartData(data);
    }

    setSearchClicked(false);
  }, [
    viewType,
    oneWeekTotals,
    lastMonthTotals,
    oneWeekData,
    lastMonthData,
    filteredSalesData,
    sales,
    searchClicked, // 검색이 클릭되었을 때만 이 useEffect를 실행
    fillMissingDays,
    aggregateMonthlyData,
    customTotalDay,
  ]);

  const handleViewTypeChange = useCallback((type) => {
    const now = new Date();
    if ((type === "week" || type === "month") && now.getFullYear() !== selectedYear) {
      alert("지난 7일 및 저번달 데이터는 현재 연도에만 사용할 수 있습니다.");
      return;
    }
    setViewType(type);
    setActiveButton(type);

    if (type === "week" || type === "month") {
      setSearchClicked(true); // 뷰 타입이 변경될 때마다 데이터를 다시 가져오도록 설정
    } else if (type === "all") {
      setChartData(sales || []);
      setTotalSales(sales.reduce((acc, sale) => acc + (sale.totalSales || 0), 0));
      setTotalCount(sales.reduce((acc, sale) => acc + (sale.count || 0), 0));
      setDataKey("totalSales");
    }
  }, [sales, selectedYear]);

  const handleSearchClick = useCallback(() => {
    setSearchClicked(true);
    setActiveButton("search");
    setViewType("custom");
  }, []);

  const isDisabled = startDate > endDate;

  const keyName =
    viewType === "all"
      ? "총 매출"
      : viewType === "week"
      ? "지난 7일"
      : viewType === "month"
      ? "저번달"
      : viewType === "year"
      ? `${selectedYear}년`
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
                handleYearChange={handleYearChange}
                selectedYear={selectedYear}
                years={years}
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
