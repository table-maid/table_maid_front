/** @jsxImportSource @emotion/react */
import * as s from "./style";

function SalesList({ salesData }) {
  return (
    <div css={s.listContainer}>
      <div css={s.askTitle}>
        <li>메뉴이름</li>
        <li>가격</li>
        <li>판매량</li>
        <li>년도</li>
        <li>달</li>
        <li>요일</li>
      </div>
      {salesData.map((item) => (
        <ul key={item.salesId} css={s.list}>
          <li>{item.menuName}</li>
          <li>{item.menuTotalPrice}</li>
          <li>{item.count}</li>
          <li>{item.year}</li>
          <li>{item.month}</li>
          <li>{item.day}</li>
        </ul>
      ))}
    </div>
  );
}

export default SalesList;
