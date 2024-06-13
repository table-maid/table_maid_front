// hooks/useSalesData.js
import { useEffect, useState } from "react";
import { getDaysAgo } from "../utils/dateFortmatter";
import { calculateTotals } from "../utils/calculateUtils";
import {
  filterDataByDate,
  filterDataByYearAndMonth,
} from "../utils/filters/salesFilters";

const useSalesData = (selectSalesData) => { // 일주일, 저번달 날짜 계산
  const [data, setData] = useState({
    oneWeekData: [],
    lastMonthData: [],
    customDateRangeData: {
      totalSales: 0,
      totalCount: 0,
      filteredData: [],
    },
    oneWeekTotals: { totalSales: 0, totalCount: 0 },
    lastMonthTotals: { totalSales: 0, totalCount: 0 },
  });

  const processSalesData = async (salesData) => {
    const now = new Date();
    const sevenDaysAgo = getDaysAgo(now, 7);
    const lastYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();

    const oneWeekData = filterDataByDate(salesData, sevenDaysAgo, now);
    const lastMonthData = filterDataByYearAndMonth(salesData, lastYear, lastMonth);

    const oneWeekTotals = calculateTotals(oneWeekData);
    const lastMonthTotals = calculateTotals(lastMonthData);

    setData({
      oneWeekData,
      lastMonthData,
      oneWeekTotals,
      lastMonthTotals,
      customDateRangeData: {
        totalSales: 0,
        totalCount: 0,
        filteredData: [],
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await processSalesData(selectSalesData);
      } catch (error) {
        console.log("에러 :", error);
      }
    };

    fetchData();
  }, [selectSalesData]);

  const customTotalDay = (startDate, endDate) => { // 사용자 지정 날짜 범위 날짜 계산
    const filteredData = filterDataByDate(selectSalesData, startDate, endDate);
    const totals = calculateTotals(filteredData);
    return { ...totals, filteredData };
  };

  return {
    ...data,
    customTotalDay,
  };
};

export default useSalesData;
