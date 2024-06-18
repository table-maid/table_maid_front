import { useEffect, useState } from "react";
import { getDaysAgo } from "../utils/dateFortmatter";
import { calculateTotals } from "../utils/calculateUtils";
import {
  filterDataByDate,
  filterDataByYearAndMonth,
} from "../utils/filters/salesFilters";

const useSalesData = (selectSalesData) => {
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
    dailySales: 0, 
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

    // 하루 매출 계산
    const today = new Date();
    const todayData = filterDataByDate(salesData, today, today);
    const dailySalesTotal = calculateTotals(todayData).totalSales;

    setData({
      oneWeekData,
      lastMonthData,
      oneWeekTotals,
      lastMonthTotals,
      dailySales: dailySalesTotal, 
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

  const customTotalDay = (startDate, endDate) => {
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
