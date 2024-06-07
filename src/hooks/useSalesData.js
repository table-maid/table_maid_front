import { useEffect, useState } from "react";
import { getDaysAgo } from "../utils/dateFortmatter";
import { calculateTotals } from "../utils/calculateUtils";
import {
  filterDataByDateRange,
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
  });

  useEffect(() => {
    try {
      const now = new Date();
      const sevenDaysAgo = getDaysAgo(now, 7);
      const lastYear =
        now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();

      const oneWeekData = filterDataByDateRange(
        selectSalesData,
        sevenDaysAgo,
        now
      );
      const lastMonthData = filterDataByYearAndMonth(
        selectSalesData,
        lastYear,
        lastMonth
      );

      const oneWeekTotals = calculateTotals(oneWeekData);
      const lastMonthTotals = calculateTotals(lastMonthData);

      setData((prev) => ({
        ...prev,
        oneWeekData,
        lastMonthData,
        oneWeekTotals,
        lastMonthTotals,
      }));
    } catch (error) {
      console.log("에러", error);
    }
  }, [selectSalesData]);

  const calculateTotalsForCustomRange = (startDate, endDate) => {
    const filteredData = filterDataByDateRange(
      selectSalesData,
      startDate,
      endDate
    );
    const totals = calculateTotals(filteredData);
    return { ...totals, filteredData };
  };

  return {
    ...data,
    calculateTotalsForCustomRange,
  };
};

export default useSalesData;
