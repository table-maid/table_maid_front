import { startOfDay, endOfDay } from "../dateFortmatter";

export const filterDataByDate = (data, startDate, endDate) => {
  return data.filter((item) => {
    const saleDate = new Date(item.year, item.month - 1, item.day);
    return saleDate >= startOfDay(startDate) && saleDate <= endOfDay(endDate);
  });
};

export const filterDataByYearAndMonth = (data, year, month) => {
  return data.filter((item) => item.year === year && item.month === month);
};
