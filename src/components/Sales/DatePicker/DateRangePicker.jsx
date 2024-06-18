/** @jsxImportSource @emotion/react */
import * as s from "./style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchOutline, IoClose } from "react-icons/io5";

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearchClick,
  isDisabled,
  activeButton,
}) => {
  return (
    <div css={s.calenderLayout}>
      <div css={s.calender}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy MM dd"
          maxDate={new Date()}
          css={s.customButton}
        />
      </div>
      <div css={s.calender}>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy MM dd"
          maxDate={new Date()}
          css={s.customButton}
        />
      </div>
      <button
        disabled={isDisabled}
        onClick={handleSearchClick}
        css={s.sercher(isDisabled, activeButton === "search")}
      >
        {isDisabled ? (
          <IoClose css={s.searchIcon(isDisabled)} />
        ) : (
          <IoSearchOutline css={s.searchIcon(isDisabled)} />
        )}
      </button>
    </div>
  );
};

export default DateRangePicker;
