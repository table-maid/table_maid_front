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
import CurrentTime from "../../../components/CurrentTime/CurrentTime";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";

function AdminMainPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [isOff, setIsOff] = useState(true);
  const [daySales, setDaySales] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [readyMoney, setReadyMoney] = useState(0);
  const [depositMoney, setDepositMoney] = useState(0);

  const getSelectSalesQuery = useQuery(
    ["getSelectSalesQuery"],
    () => getSelectSalesRequest(adminId),
    {
      enabled: !!adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setAllSales(response.data);
        if (isOff) {
          setDaySales(response.data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedDate = localStorage.getItem("date");
    if (storedDate !== today) {
      // 하루 지나면 초기화
      setReadyMoney(0);
      setDepositMoney(0);
      localStorage.setItem("readyMoney", 0);
      localStorage.setItem("depositMoney", 0);
      localStorage.setItem("date", today);
    } else {
      // 하루 안 지나면 값 복원
      const storedReadyMoney = localStorage.getItem("readyMoney");
      const storedDepositMoney = localStorage.getItem("depositMoney");
      if (storedReadyMoney) setReadyMoney(parseInt(storedReadyMoney, 10));
      if (storedDepositMoney) setDepositMoney(parseInt(storedDepositMoney, 10));
    }
  }, []);

  useEffect(() => {
    if (isOff) {
      setDaySales(allSales);
    } else {
      setDaySales([]);
      setReadyMoney(0);
      setDepositMoney(0);
    }
  }, [isOff, allSales]);

  const toggleSwitch = () => {
    const newStatus = !isOff;
    const message = newStatus
      ? "개점 상태로 변경하시겠습니까?"
      : "마감 상태로 변경하시겠습니까?";
    if (window.confirm(message)) {
      setIsOff(newStatus);
      if (newStatus) {
        // 개점 상태로 변경되었을 때 값 복원
        const storedReadyMoney = localStorage.getItem("readyMoney");
        const storedDepositMoney = localStorage.getItem("depositMoney");
        if (storedReadyMoney) setReadyMoney(parseInt(storedReadyMoney, 10));
        if (storedDepositMoney)
          setDepositMoney(parseInt(storedDepositMoney, 10));
      }
    }
  };

  const handleMoneyChange = (item) => (e) => {
    const value = e.target.value.replace(/,/g, "");
    item(parseInt(value, 10) || 0);
    localStorage.setItem(e.target.name, value);
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
    window.location.replace("/admin/auth/signin");
  };

  const handleHoleClick = () => {
    window.location.replace("/admin/pos/main");
  };

  const handleSalesClick = () => {
    window.location.replace("/admin/sales/home");
  };

  const getCurrentMonthEnd = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); 
    return endOfMonth;
  };

  
  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.date}>
          <CurrentTime />
        </div>
      </div>
      <div css={s.calendarSection}>
        <div css={s.calendar}>
          <FullCalendar
            height={670}
            locale={"ko"}
            selectable={true}
            dayMaxEventRows={true}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            validRange={{
              end: getCurrentMonthEnd(),
            }}
          />
        </div>
        <div css={s.sideSection}>
          <div css={s.logoBox}>
            <h1 css={s.logo}>𝓣𝓪𝓫𝓵𝓮𝓜𝓪𝓲𝓭</h1>
          </div>
          <div css={s.inputSection}>
            <label>준비금</label>
            <div css={s.inputContainer}>
              <input
                type="text"
                name="readyMoney"
                value={formatNumberWithCommas(readyMoney)}
                onChange={handleMoneyChange(setReadyMoney)}
                disabled={!isOff}
              />
              <span>원</span>
            </div>
          </div>
          <div css={s.inputSection}>
            <label>예치금</label>
            <div css={s.inputContainer}>
              <input
                type="text"
                name="depositMoney"
                value={formatNumberWithCommas(depositMoney)}
                onChange={handleMoneyChange(setDepositMoney)}
                disabled={!isOff}
              />
              <span>원</span>
            </div>
          </div>
          <div css={s.toggle}>
            <span>마감</span>
            <Switch
              onChange={toggleSwitch}
              checked={isOff}
              offColor="#767577"
              onColor="#b6b6b6"
              offHandleColor="#f4f3f4"
              onHandleColor="#4cb5f9"
              checkedIcon={false}
              uncheckedIcon={false}
            />
            <span>개점</span>
          </div>
          <div css={s.buttons}>
            <button onClick={handleHoleClick} disabled={!isOff}>
              영업화면
            </button>
            <button onClick={handleSalesClick}>관리하기</button>
            <button onClick={handleLogoutClick}>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainPage;
