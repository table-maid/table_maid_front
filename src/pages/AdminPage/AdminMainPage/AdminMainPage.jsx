/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Switch from "react-switch";

function AdminMainPage(props) {
  const [isOff, setIsOff] = useState(false);

  const toggleSwitch = () => {
    setIsOff((prev) => !prev);
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.logo}>로고</div>
        <div css={s.date}>2024.05.26(일) 13:26</div>
      </div>
      <div css={s.calendarSection}>
        <div css={s.calendar}>
          <FullCalendar
            height={600}
            locale={"ko"}
            selectable="true"
            navLinks="true"
            dayMaxEventRows={true}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
          />
        </div>
        <div css={s.sideSection}>
          <h1>가게 로고</h1>
          <div css={s.inputSection}>
            <label>준비금</label>
            <input type="text" />
          </div>
          <div css={s.inputSection}>
            <label>예치금</label>
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
          <div css={s.toggle}>
            <div>마감</div>
            <Switch
              onChange={toggleSwitch}
              checked={isOff}
              offColor="#767577"
              onColor="#b6b6b6"
              offHandleColor="#f4f3f4"
              onHandleColor="#81b0ff"
              checkedIcon={false}
              uncheckedIcon={false}
            />
            <div>개점</div>
          </div>
          <div css={s.buttons}>
            <button>영업화면</button>
            <button>관리하기</button>
            <button>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainPage;
