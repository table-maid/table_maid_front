/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Switch from "react-switch";
import { useQuery } from "react-query";
import { getSelectSalesRequest } from "../../../apis/api/salesApi";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useRecoilState } from "recoil";

function AdminMainPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [isOff, setIsOff] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [daySales, setDaySales] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setTimer(
        `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일${hours}:${minutes}:${seconds}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSwitch = () => {
    setIsOff((prev) => !prev);
  };

  const getSelectSalesQuery = useQuery(
    ["getSelectSalesQuery"],
    () =>
      getSelectSalesRequest(adminId),
    {
      enabled: !adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setDaySales(response.data);
        console.log(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    console.log(daySales);
  }, [daySales]);

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.date}>{timer}</div>
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
