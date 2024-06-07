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
import { CgDanger } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";

function AdminSalesPage(props) {
  const [sales, setSales] = useState([]);
  const [selectSalesData, setSelectSalesData] = useState([]);
  const [viewType, setViewType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalSales, setTotalSales] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredSalesData, setFilteredSalesData] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const {
    oneWeekData,
    lastMonthData,
    calculateTotalsForCustomRange,
    oneWeekTotals,
    lastMonthTotals,
  } = useSalesData(selectSalesData);

  const salesQuery = useQuery("salesQuery", getSalesRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      setSales(response.data);
    },
    onError: (error) => {
      console.log("에러 :", error);
    },
  });

  const selectSalesQuery = useQuery("selectSalesQuery", getSelectSalesRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      setSelectSalesData(response.data);
    },
    onError: (error) => {
      console.log("에러 :", error);
    },
  });

  useEffect(() => {
    if (viewType === "week") {
      setTotalSales(oneWeekTotals.totalSales);
      setTotalCount(oneWeekTotals.totalCount);
    } else if (viewType === "month") {
      setTotalSales(lastMonthTotals.totalSales);
      setTotalCount(lastMonthTotals.totalCount);
    } else if (viewType === "custom" && searchClicked) {
      const { totalSales, totalCount, filteredData } =
        calculateTotalsForCustomRange(startDate, endDate);
      setFilteredSalesData(filteredData);
      setTotalSales(totalSales);
      setTotalCount(totalCount);
      setSearchClicked(false);
    }
  }, [
    viewType,
    searchClicked,
    startDate,
    endDate,
    oneWeekTotals,
    lastMonthTotals,
    calculateTotalsForCustomRange,
  ]);

  const handleViewTypeChange = (type) => {
    setViewType(type);
    if (type !== "custom") {
      setSearchClicked(false);
    }
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
    setViewType("custom");
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.title}>매출 조회</div>
      </div>
      <div css={s.main}>
        <div css={s.chartContainer}>
          <AdminSalesChart
            sales={sales.map((data) => ({
              totalSales: data.totalSales,
              month: data.month,
            }))}
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
                <button
                  onClick={() => handleViewTypeChange("week")}
                  css={s.button}
                >
                  지난 7일
                </button>
                <button
                  onClick={() => handleViewTypeChange("month")}
                  css={s.button}
                >
                  저번달
                </button>
              </div>
            </div>
            <div css={s.calenderLayout}>
              <div css={s.calender}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy MM dd"
                  maxDate={new Date()}
                  css={s.customButton}
                />
              </div>
              <div css={s.calender}>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy MM dd"
                  maxDate={new Date()}
                  css={s.customButton}
                />
              </div>
              <button
                disabled={startDate > endDate}
                onClick={handleSearchClick}
                css={s.sercher}
              >
                <IoSearchOutline />
              </button>
            </div>
          </div>
          <div css={s.totalLayout}>
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
          <div css={s.list}>
            {viewType === "week" ? (
              <SalesList salesData={oneWeekData} />
            ) : viewType === "month" ? (
              <SalesList salesData={lastMonthData} />
            ) : viewType === "custom" && filteredSalesData.length > 0 ? (
              <SalesList salesData={filteredSalesData} />
            ) : (
              <div css={s.noDateBox}>
                <h1>
                  <CgDanger /> 매출정보가 없습니다
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSalesPage;
