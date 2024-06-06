import { useEffect, useState } from "react";

const useSalesData = (selectSalesData) => {
  const [data, setData] = useState({
    oneWeekData: [],
    lastMonthData: []
  });

  useEffect(() => {
    try {
      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();
      const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

      const oneWeekData = selectSalesData.filter((item) => {
        const saleDate = new Date(item.year, item.month - 1, item.day);
        return saleDate >= sevenDaysAgo && saleDate <= now;
      });

      const lastMonthData = selectSalesData.filter((item) => {
        return item.year === lastYear && item.month === (now.getMonth() === 0 ? 12 : now.getMonth());
      });

      setData({
        oneWeekData,
        lastMonthData
      });
    } catch (error) {
      console.log("에러", error);
    }
  }, [selectSalesData]);

  return data;
};

export default useSalesData;
