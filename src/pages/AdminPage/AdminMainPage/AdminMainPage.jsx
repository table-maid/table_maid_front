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
  const [isOff, setIsOff] = useState(true);
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

  useEffect(() => {
    if (!isOff) {
      // 마감 상태일 때
      setDaySales([]);
    }
  }, [isOff]); // isOff 상태가 변경될 때마다 실행

  const toggleSwitch = () => {
    setIsOff((prev) => !prev);
  };

  const getSelectSalesQuery = useQuery(
    ["getSelectSalesQuery"],
    () => getSelectSalesRequest(adminId),
    {
      enabled: !!adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setDaySales(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const convertToEvents = (sales) => {
    if (!Array.isArray(sales)) {
      console.error("Sales data is not an array:", sales);
      return [];
    }
    return sales
      .map((sale, index) => {
        if (sale.year && sale.month && sale.day && sale.dayTotalSales) {
          const date = new Date(sale.year, sale.month - 1, sale.day)
            .toISOString()
            .split("T")[0];
          const formattedTotalSales = sale.dayTotalSales.toLocaleString();
          return {
            title: `일매출: ${formattedTotalSales}원`,
            start: date,
          };
        } else {
          console.error(
            `Sale item at index ${index} is missing required fields:`,
            sale
          );
          return null;
        }
      })
      .filter((event) => event !== null);
  };

  const events = convertToEvents(daySales);

  const handleLogoutClick = () => {
    if (adminId === 0) {
      return;
    }

    localStorage.removeItem("AccessToken");
    alert("로그아웃 성공");
    window.location.replace("/auth/signin");
  };

  const handleHoleClick = () => {
    window.location.replace("/");
  };

  const handleSalesClick = () => {
    window.location.replace("/sales/home");
  };

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
            events={events}
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
            <button onClick={handleHoleClick}>영업화면</button>
            <button onClick={handleSalesClick}>관리하기</button>
            <button onClick={handleLogoutClick}>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainPage;
