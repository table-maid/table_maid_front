import { useCallback } from "react";

export const useSalesUtils = () => {
  const fillMissingDays = useCallback((startDate, endDate, salesData) => {
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
  }, []);

  const aggregateMonthlyData = useCallback((salesData) => {
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
  }, []);

  const aggregateMonthlyDataForYear = useCallback((salesData, year) => {
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
  }, []);

  return {
    fillMissingDays,
    aggregateMonthlyData,
    aggregateMonthlyDataForYear,
  };
};
