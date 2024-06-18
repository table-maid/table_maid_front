/** @jsxImportSource @emotion/react */
import * as s from "./style";

const SalesButtons = ({ handleViewTypeChange, activeButton }) => {
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
        <button
          onClick={() => handleViewTypeChange("all")}
          css={s.button(activeButton === "all")}
        >
          전체
        </button>
      </div>
    </div>
  );
};

export default SalesButtons;
