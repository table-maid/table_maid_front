/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  getSalesRequest,
  getSelectSalesRequest,
} from "../../../apis/api/salesApi";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSalesData from "../../../hooks/useSalesData";
import SalesList from "../../../components/Sales/SalesList/SalesList";

function AdminSalesPage(props) {
  const [sales, setSales] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [selectSalesData, setSelectSalesData] = useState([]);
  const [showWeekData, setShowWeekData] = useState(false);
  const [showMonthData, setShowMonthData] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalSales, setTotalSales] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [filteredSalesData, setFilteredSalesData] = useState([]);

  useEffect(() => {
    // 달별 총 매출
    setSalesData(() =>
      sales.map((data) => ({
        totalSales: data.totalSales,
        month: data.month,
      }))
    );
  }, [sales]);

  const {
    oneWeekData,
    lastMonthData,
    customDateRangeData,
    calculateTotalsForCustomRange,
    oneWeekTotals,
    lastMonthTotals,
  } = useSalesData(selectSalesData);

  const salesQuery = useQuery(["salesQuery"], getSalesRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      console.log("Sales API Response:", response.data);
      setSales(response.data);
    },
    onError: (error) => {
      console.log("에러", error);
    },
  });

  const selectSalesQuery = useQuery(
    ["selectSalesQuery"],
    getSelectSalesRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log("Select Sales API Response:", response.data);
        setSelectSalesData(response.data);
      },
      onError: (error) => {
        console.log("salesQuery Error:", error);
      },
    }
  );

  const handleSearchClick = () => {
    calculateTotalsForCustomRange(startDate, endDate);
    setSearchClicked(true);

    const filteredData = selectSalesData.filter((item) => {
      const saleDate = new Date(item.year, item.month - 1, item.day);
      return saleDate >= startOfDay(startDate) && saleDate <= endOfDay(endDate);
    });

    setFilteredSalesData(filteredData);
  };

  useEffect(() => {
    setTotalSales(customDateRangeData.totalSales);
    setTotalCount(customDateRangeData.totalCount);
  }, [customDateRangeData]);

  const handleWeekButtonClick = () => {
    setShowWeekData(true);
    setShowMonthData(false);
    setSearchClicked(false); // 검색 상태 초기화
    setTotalSales(oneWeekTotals.totalSales);
    setTotalCount(oneWeekTotals.totalCount);
  };

  const handleMonthButtonClick = () => {
    setShowWeekData(false);
    setShowMonthData(true);
    setSearchClicked(false); // 검색 상태 초기화
    setTotalSales(lastMonthTotals.totalSales);
    setTotalCount(lastMonthTotals.totalCount);
  };

  const startOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const endOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.title}>매출 조회</div>
      </div>
      <div css={s.main}>
        <div css={s.chartContainer}>
          <AdminSalesChart
            sales={salesData}
            monthKey={"month"}
            keyName={"총 매출"}
            dataKey={"totalSales"}
            lineColor={"#ff7300"}
          />
        </div>
        <div css={s.salesLayout}>
          <div css={s.selectBox}>
            <div css={s.selectButton}>
              <div css={s.buttonBox}>
                <button onClick={handleWeekButtonClick} css={s.button}>
                  지난 7일
                </button>
                <button onClick={handleMonthButtonClick} css={s.button}>
                  저번달
                </button>
              </div>
            </div>
            <div css={s.calender}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
              <button
                disabled={startDate > endDate}
                onClick={handleSearchClick}
              >
                검색
              </button>
            </div>
          </div>
          <div css={s.totalLayout}>
            <div>
              <h1>매출</h1>
            </div>
            <div css={s.totalContainer}>
              <div>
                <h1>매출합계 : {totalSales} 원</h1>
                <h1>주문수합계 : {totalCount}건</h1>
              </div>
            </div>
          </div>
          <div css={s.list}>
            {showWeekData && <SalesList salesData={oneWeekData} />}
            {showMonthData && <SalesList salesData={lastMonthData} />}
            {searchClicked && !showWeekData && !showMonthData && (
              <SalesList salesData={filteredSalesData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSalesPage;
