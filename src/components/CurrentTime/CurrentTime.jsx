import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { currentTimeState } from "../../atoms/CurrenttimeStateAtom";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

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

  return (
    <div>
      {formatDate(currentTime)} {formatTime(currentTime)}
    </div>
  );
};

export default CurrentTime;
