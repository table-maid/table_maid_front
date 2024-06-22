/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function PosMainPage(props) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekDay = weekDays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekDay})`;
  };

  const handleClick = () => {
    navigate("/pos/table/detail");
  };

  const renderTables = () => {
    const tables = [];
    for (let i = 0; i < 8; i++) {
      tables.push(
        <button css={s.tableButton} key={i}>
          <div css={s.table}>
            <div css={s.tableHeader}>
              <span css={s.tableNumber}></span>
              <span css={s.tablePeople}></span>
            </div>
            <div css={s.tableDetails}>
              <div css={s.buttonBox}>
                <button css={s.button} onClick={handleClick}>
                  <FaPlus size={"50"} />
                </button>
              </div>
            </div>
          </div>
        </button>
      );
    }
    return tables;
  };

  return (
    <div css={s.posLayout}>
      <div css={s.timeLayout}>
        <div>
          {formatDate(currentTime)} {formatTime(currentTime)}
        </div>
      </div>
      <div css={s.tableLayout}>
        <div css={s.tableContainer}>
          <button css={s.tableButton}>
            <div css={s.table}>
              <div css={s.tableHeader}>
                <span css={s.tableNumber}>01</span>
                <span css={s.tablePeople}>3명</span>
              </div>
              <div css={s.tableDetails}>
                <div css={s.menuItem}>
                  <span>떡볶이 대</span>
                  <span>1</span>
                </div>
                <div css={s.menuItem}>
                  <span>쥬시쿨</span>
                  <span>2</span>
                </div>
                <div css={s.menuItem}>
                  <span>쥬시쿨</span>
                  <span>2</span>
                </div>
                <div css={s.menuItem}>
                  <span>쥬시쿨</span>
                  <span>2</span>
                </div>
              </div>
                <div css={s.totalPrice}>20,000</div>
            </div>
          </button>
          {renderTables()}
        </div>
      </div>
      <div css={s.managmentLayout}>
        <div css={s.managmentContainer}>
          <button css={s.managementButton}>이동</button>
          <button css={s.managementButton}>합석</button>
          <button css={s.managementButton}>분리</button>
          <button css={s.managementButton}>단체지정</button>
          <button css={s.managementButton}>단체결제</button>
          <button css={s.managementButton}>주문내역</button>
        </div>
      </div>
    </div>
  );
}

export default PosMainPage;
