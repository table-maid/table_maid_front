/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  getSalesRequest,
  getSelectSalesRequest,
} from "../../../apis/api/salesApi";
import AdminSalesChart from "../../../components/Sales/AdminSalesChart/AdminSalesChart";
import Calendar from "../../../components/Calendar/Calendar";
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

  useEffect(() => { // 달별 총 매출
    setSalesData(() =>
      sales.map((data) => ({
        totalSales: data.totalSales,
        month: data.month,
      }))
    );
  }, [sales]);

  const { oneWeekData, lastMonthData } = useSalesData(selectSalesData);

  const salesQuery = useQuery(["salesQuery"], getSalesRequest, { // 총 매출
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      // console.log("Sales API Response:", response.data);
      setSales(response.data);
    },
    onError: (error) => {
      console.log("에러", error);
    },
  });

  const selectSalesQuery = useQuery( // 판매 전체 조회
    ["selectSalesQuery"],
    getSelectSalesRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log("Sales API Response:", response.data);
        setSelectSalesData(response.data);
      },
      onError: (error) => {
        console.log("salesQuery Error:", error);
      },
    }
  );
  // console.log(selectSales.map((data) => data.totalSales));

  const handleWeekButtonClick = () => {
    setShowWeekData(true);
    setShowMonthData(false); // 월 정보는 숨김
  };

  const handleMonthButtonClick = () => {
    setShowWeekData(false); // 일주일치 정보는 숨김
    setShowMonthData(true);
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
              <Calendar
                selectedDate={startDate}
                setSelectedDate={setStartDate}
              />
              <Calendar 
              selectedDate={endDate} 
              setSelectedDate={setEndDate} />
              <button disabled={startDate > endDate}>검색</button>
            </div>
          </div>
          <div css={s.list}>
            {showWeekData && <SalesList salesData={oneWeekData} />}
            {showMonthData && <SalesList salesData={lastMonthData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSalesPage;
