/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";

function PosMainPage(props) {
  return (
      <AdminPageLayout>

      <div css={s.posLayout}>
        <div css={s.timeLayout}>
          <div>시간</div>
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
                  <div css={s.totalPrice}>20,000</div>
                </div>
              </div>
            </button>
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
      </AdminPageLayout>
  );
}

export default PosMainPage;
