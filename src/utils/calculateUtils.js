export const calculateTotals = (data) => {
  return data.reduce(
    (sum, item) => {
      sum.totalSales += item.dayTotalSales ? item.dayTotalSales : 0;
      sum.totalCount += item.count ? item.count : 0;
      return sum;
    },
    { totalSales: 0, totalCount: 0 }
  );
};
