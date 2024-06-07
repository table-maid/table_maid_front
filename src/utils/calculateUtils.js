export const calculateTotals = (data) => {
  return data.reduce(
    (acc, item) => {
      acc.totalSales += item.dayTotalSales ? item.dayTotalSales : 0;
      acc.totalCount += item.count ? item.count : 0;
      return acc;
    },
    { totalSales: 0, totalCount: 0 }
  );
};
