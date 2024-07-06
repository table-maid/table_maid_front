/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { CgDanger } from "react-icons/cg";
import SalesList from "../../../components/Sales/SalesList/SalesList";

const SalesListContainer = ({ viewType, oneWeekData, lastMonthData, filteredSalesData, sales }) => {
  let salesData = [];
  
  if (viewType === "week") {
    salesData = oneWeekData;
  } else if (viewType === "month") {
    salesData = lastMonthData;
  } else if (viewType === "custom") {
    salesData = filteredSalesData;
  } else if (viewType === "year") {
    salesData = filteredSalesData;
  } else if (viewType === "all") {
    salesData = sales;
  }

  return (
    <div css={s.list}>
      {salesData.length > 0 ? (
        <SalesList salesData={salesData} viewType={viewType} />
      ) : (
        <div css={s.noDateBox}>
          <h1>
            <CgDanger /> 매출정보가 존재하지 않습니다
          </h1>
        </div>
      )}
    </div>
  );
};

export default SalesListContainer;
