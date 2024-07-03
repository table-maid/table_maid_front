/**@jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";

function UserCurrentTime(props) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
	  const interval = setInterval(() => {
		setTime(new Date());
	  }, 1000);
  
	  return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
	}, []);
  
	const formatTime = (date) => {
	  const hours = String(date.getHours()).padStart(2, "0");
	  const minutes = String(date.getMinutes()).padStart(2, "0");
	  return `${hours}:${minutes}`;
	};
  
	return (
	  <div css={s.size}>
		{formatTime(time)}
	  </div>
	);
}

export default UserCurrentTime;