/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const datepickerRef = useRef(null);

  return (
    <>
      <DatePicker
        css={s.calendar}
        showIcon
        ref={datepickerRef}
        // shouldCloseOnSelect
        dateFormat="yyyy-MM-dd"
        placeholderText="선택하세요"
        selected={selectedDate} // 선택된 날짜를 DatePicker에 전달
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()} // 오늘 이후의 날짜 선택 불가능하게 설
      />
    </>
  );
}

export default Calendar;
