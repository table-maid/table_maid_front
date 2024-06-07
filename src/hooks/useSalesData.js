import { useEffect, useState } from "react";

const useSalesData = (selectSalesData) => {
  const [data, setData] = useState({
    oneWeekData: [],
    lastMonthData: [],
    customDateRangeData: {
      totalSales: 0,
      totalCount: 0,
    },
    oneWeekTotals: { totalSales: 0, totalCount: 0 },
    lastMonthTotals: { totalSales: 0, totalCount: 0 },
  });

  useEffect(() => {
    try {
      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const lastYear =
        now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

      const oneWeekData = selectSalesData.filter((item) => {
        const saleDate = new Date(item.year, item.month - 1, item.day);
        return saleDate >= sevenDaysAgo && saleDate <= now;
      });

      const lastMonthData = selectSalesData.filter((item) => {
        return (
          item.year === lastYear &&
          item.month === (now.getMonth() === 0 ? 12 : now.getMonth())
        );
      });

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
    const filteredData = selectSalesData.filter((item) => {
      const saleDate = new Date(item.year, item.month - 1, item.day);
      return saleDate >= startOfDay(startDate) && saleDate <= endOfDay(endDate);
    });

    const totals = calculateTotals(filteredData);

    setData((prev) => ({
      ...prev,
      customDateRangeData: totals,
    }));
  };

  const calculateTotals = (data) => {
    return data.reduce(
      (acc, item) => {
        acc.totalSales += item.dayTotalSales ? item.dayTotalSales : 0;
        acc.totalCount += item.count ? item.count : 0;
        return acc;
      },
      { totalSales: 0, totalCount: 0 }
    );
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

  return {
    ...data,
    calculateTotalsForCustomRange,
  };
};

export default useSalesData;
