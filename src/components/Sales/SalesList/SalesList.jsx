/** @jsxImportSource @emotion/react */
import * as s from './style';

function SalesList({ salesData, viewType }) {
  return (
    <div css={s.listContainer}>
      <div css={s.askTitle}>
        <li>거래 일자</li>
        <li>주문 수</li>
        <li>매출 금액</li>
      </div>
      {salesData.map((item) => (
        <ul key={item.salesId} css={s.list}>
          {viewType === 'all' ? (
            <li>
              {item.year} 년 {item.month} 월
            </li>
          ) : (
            <li>
              {item.year} 년 {item.month} 월 {item.day} 일
            </li>
          )}
          <li>{item.count} 건</li>
          <li>{viewType === 'all' ? item.totalSales : item.dayTotalSales} 원</li>
        </ul>
      ))}
    </div>
  );
}

export default SalesList;
