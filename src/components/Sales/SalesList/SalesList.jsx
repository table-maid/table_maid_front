/** @jsxImportSource @emotion/react */
import * as s from "./style";

function SalesList({ salesData }) {
  return (
    <div css={s.listContainer}>
      <div css={s.askTitle}>
        <li>메뉴 이름</li>
        <li>가격</li>
        <li>판매량</li>
        <li>Year</li>
        <li>Month</li>
        <li>Day</li>
      </div>
      {salesData.map((item) => (
        <ul key={item.salesId} css={s.list}>
          <li>{item.menuName}</li>
          <li>{item.menuTotalPrice} 원</li>
          <li>{item.count} 개</li>
          <li>{item.year} 년</li>
          <li>{item.month} 월</li>
          <li>{item.day} 일</li>
        </ul>
      ))}
    </div>
  );
}

export default SalesList;
