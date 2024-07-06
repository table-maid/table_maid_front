/** @jsxImportSource @emotion/react */
import * as s from "./style";

const SalesButtons = ({
  handleViewTypeChange,
  activeButton,
  handleYearChange,
  selectedYear,
  years,
}) => {
  return (
    <div css={s.selectButton}>
      <div css={s.buttonBox}>
        <button
          onClick={() => handleViewTypeChange("week")}
          css={s.button(activeButton === "week")}
        >
          지난 7일
        </button>
        <button
          onClick={() => handleViewTypeChange("month")}
          css={s.button(activeButton === "month")}
        >
          저번달
        </button>
        <select
          onChange={(e) => handleYearChange(e.target.value)}
          value={selectedYear}
          css={s.button(activeButton === "year")}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SalesButtons;
