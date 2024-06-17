export const calculateTotals = (salesData) => {
	const totalSales = salesData.reduce((acc, sale) => acc + sale.totalSales, 0);
	const totalCount = salesData.reduce((acc, sale) => acc + sale.count, 0);
  
	return { totalSales, totalCount };
  };
  