/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import * as s from './style';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SalesList({ salesData, viewType }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemCount = viewType === 'limited' ? 4 : 10;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemCount;
  const paginatedData = salesData.slice(offset, offset + itemCount);
  const pageCount = Math.ceil(salesData.length / itemCount);

  return (
    <div css={s.listContainer}>
      <div css={s.askTitle}>
        <li>거래 일자</li>
        <li>주문 수</li>
        <li>매출 금액</li>
      </div>
      {paginatedData.map((item) => (
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
      {salesData.length > (viewType === 'limited' ? 4 : 10) && pageCount > 1 && (
        <ReactPaginate
          previousLabel={currentPage > 0 ? <MdKeyboardArrowLeft /> : null}
          nextLabel={<MdKeyboardArrowRight />}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          css={s.pagination}
        />
      )}
    </div>
  );
}

export default SalesList;
