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

  useEffect(() => {
    setViewType("all");
  }, []);

  const salesQuery = useQuery(["salesQuery"], () => getSalesRequest(adminId), {
    retry: 0,
    onSuccess: (response) => {
      const salesData = response.data;
      setSales(salesData);
      const uniqueYears = [
        ...new Set(salesData.map((sale) => sale.year)),
      ];
      setYears(uniqueYears);
      if (viewType === "all") {
        setChartData(salesData);
        setTotalSales(
          salesData.reduce((acc, sale) => acc + sale.totalSales, 0)
        );
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

  const fillMissingDays = (startDate, endDate, salesData) => {
    const daysInRange = [];
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      daysInRange.push(new Date(day));
    }

    const dataMap = salesData.reduce((acc, sale) => {
      const saleDate = new Date(sale.year, sale.month - 1, sale.day).toISOString().split("T")[0];
      acc[saleDate] = sale;
      return acc;
    }, {});

    const filledData = daysInRange.map(day => {
      const dateKey = day.toISOString().split("T")[0];
      if (dataMap[dateKey]) {
        return dataMap[dateKey];
      } else {
        return { year: day.getFullYear(), month: day.getMonth() + 1, day: day.getDate(), dayTotalSales: 0, count: 0 };
      }
    });

    return filledData;
  };

  const aggregateMonthlyData = (salesData) => {
    const monthlyData = {};

    salesData.forEach((sale) => {
      if (!sale) return;
      const monthKey = `${sale.year}-${String(sale.month).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { year: sale.year, month: sale.month, totalSales: 0, count: 0 };
      }
      monthlyData[monthKey].totalSales += sale.totalSales || sale.dayTotalSales || 0;
      monthlyData[monthKey].count += sale.count || 0;
    });

    return Object.values(monthlyData);
  };

  const aggregateMonthlyDataForYear = (salesData, year) => {
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      year,
      month: i + 1,
      totalSales: 0,
      count: 0,
    }));

    salesData.forEach((sale) => {
      if (!sale || sale.year !== year) return;
      const monthIndex = sale.month - 1;
      monthlyData[monthIndex].totalSales += sale.totalSales || sale.dayTotalSales || 0;
      monthlyData[monthIndex].count += sale.count || 0;
    });

    return monthlyData;
  };

  const handleYearChange = useCallback((year) => {
    setSelectedYear(parseInt(year));
    setViewType("year");
    setActiveButton("year");
  }, []);

  useEffect(() => {
    if (viewType === "year") {
      const filteredYearData = sales.filter((sale) => sale.year === parseInt(selectedYear));
      console.log(`Selected Year: ${selectedYear}`, filteredYearData);
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
      console.log('Aggregated Monthly Data:', data);
    }
  }, [selectedYear, sales, viewType]);

  useEffect(() => {
    if (!searchClicked) return;

    let data = [];
    let totals = { totalSales: 0, totalCount: 0 };

    if (viewType === "week") {
      data = oneWeekData || [];
      totals = oneWeekTotals || { totalSales: 0, totalCount: 0 };
      setDataKey("dayTotalSales");
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
      console.log('Chart Data:', data);
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
  ]);

  const handleViewTypeChange = useCallback((type) => {
    const now = new Date();
    if ((type === "week" || type === "month") && now.getFullYear() !== selectedYear) {
      alert("지난 7일 및 저번달 데이터는 현재 연도에만 사용할 수 있습니다.");
      return;
    }
    setViewType(type);
    setActiveButton(type);
    if (type === "all") {
      setChartData(sales || []);
      setTotalSales(sales.reduce((acc, sale) => acc + (sale.totalSales || 0), 0));
      setTotalCount(sales.reduce((acc, sale) => acc + (sale.count || 0), 0));
      setDataKey("totalSales");
    } else {
      setSearchClicked(true); // 뷰 타입이 변경될 때마다 데이터를 다시 가져오도록 설정
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
