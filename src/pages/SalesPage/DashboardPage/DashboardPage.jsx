/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";

function DashboardPage(props) {
  return (
    <AdminPageLayout>
      <div css={s.saleLayout}>
        <div css={s.saleContainer}>
          <div css={s.saleGraphContainer}>
            <div css={s.graphBox}>일매출</div>
            <div css={s.graphBox}>주간매출</div>
            <div css={s.graphBox}>월매출</div>
          </div>
          <div css={s.menuLayout}>
            <div css={s.listBox}>리스트</div>
            <div css={s.menuBox}>주간 no1 메뉴</div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}

export default DashboardPage;
