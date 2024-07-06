/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { CgDanger } from "react-icons/cg";
import SalesList from "../../../components/Sales/SalesList/SalesList";

const SalesListContainer = ({ viewType, oneWeekData, lastMonthData, filteredSalesData, sales }) => {
  return (
    <div css={s.list}>
      {viewType === "week" && oneWeekData.length > 0 ? (
        <SalesList salesData={oneWeekData} viewType={viewType} />
      ) : viewType === "month" && lastMonthData.length > 0 ? (
        <SalesList salesData={lastMonthData} viewType={viewType} />
      ) : viewType === "custom" && filteredSalesData.length > 0 ? (
        <SalesList salesData={filteredSalesData} />
      ) : viewType === "year" && filteredSalesData.length > 0 ? (
        <SalesList salesData={filteredSalesData} viewType={viewType} />
      ) : viewType === "all" && sales.length > 0 ? (
        <SalesList salesData={sales} viewType={viewType} />
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
