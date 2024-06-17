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
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { viewTypeState } from "../../../atoms/ViewTypeStateAtom";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";

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

  const {
    oneWeekData,
    lastMonthData,
    customTotalDay,
    oneWeekTotals,
    lastMonthTotals,
  } = useSalesData(selectSalesData);

  useEffect(() => {
    // 렌더링 처음 될 때 그래프 => 총 매출
    setViewType("all");
  }, []);

  const salesQuery = useQuery(
    ["salesQuery"], // 연간 총 매출
    () => getSalesRequest(adminId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setSales(response.data);
        if (viewType === "all") {
          setChartData(response.data);
          setTotalSales(
            response.data.reduce((acc, sale) => acc + sale.totalSales, 0)
          );
          setTotalCount(
            response.data.reduce((acc, sale) => acc + sale.count, 0)
          );
          setDataKey("totalSales");
        }
      },
      onError: (error) => {
        console.log("에러 : ", error);
      },
    }
  );

  const selectSalesQuery = useQuery(
    ["selectSalesQuery"], // 하루 매출
    () => getSelectSalesRequest(adminId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
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
    let totals = { totalSales: 0, totalCount: 0 }; // key값

    if (viewType === "week") {
      data = oneWeekData;
      totals = oneWeekTotals;
      setDataKey("dayTotalSales");
    } else if (viewType === "month") {
      data = lastMonthData;
      totals = lastMonthTotals;
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
    if (type === "all") {
      setChartData(sales);
      setTotalSales(sales.reduce((acc, sale) => acc + sale.totalSales, 0));
      setTotalCount(sales.reduce((acc, sale) => acc + sale.count, 0));
      setDataKey("totalSales");
    }
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
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
        <div css={s.header}>
          <div css={s.title}>매출 조회</div>
        </div>
        <div css={s.main}>
          <div css={s.chartContainer}>
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
              lineColor={"#e78a42"}
              viewType={viewType}
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
                  <button
                    onClick={() => handleViewTypeChange("all")}
                    css={s.button}
                  >
                    전체
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
                  disabled={isDisabled}
                  onClick={handleSearchClick}
                  css={s.sercher(isDisabled)}
                >
                  {isDisabled ? (
                    <IoClose css={s.searchIcon(isDisabled)} />
                  ) : (
                    <IoSearchOutline css={s.searchIcon(isDisabled)} />
                  )}
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
              {viewType === "week" && oneWeekData.length > 0 ? (
                <SalesList salesData={oneWeekData} viewType={viewType} />
              ) : viewType === "month" && lastMonthData.length > 0 ? (
                <SalesList salesData={lastMonthData} viewType={viewType} />
              ) : viewType === "custom" && filteredSalesData.length > 0 ? (
                <SalesList salesData={filteredSalesData} />
              ) : viewType === "all" && sales.length > 0 ? (
                <SalesList salesData={sales} viewType={viewType} />
              ) : (
                <div css={s.noDateBox}>
                  <h1>
                    <CgDanger /> 매출정보가 존재하지 않습니다
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}

export default AdminSalesPage;
