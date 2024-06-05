import { useEffect, useState } from "react";

const useSalesData = (selectSalesData) => {
  const [oneweek, setOneweek] = useState([]);

  useEffect(() => {
    try {
      const today = new Date();
      const todayMonth = today.getMonth() + 1;

      const weekData = selectSalesData.filter((item) => {
        if (todayMonth === item.month) {
          return item.day >= today.getDate() - 7 && item.day <= today.getDate();
        } else {
          return (
            (item.month === todayMonth - 1 && item.day >= today.getDate()) ||
            (item.month === todayMonth && item.day <= today.getDate())
          );
        }
      });

      setOneweek(weekData);
    } catch (error) {
      console.log("에러", error);
    }
  }, [selectSalesData]);

  return oneweek;
};

export default useSalesData;
