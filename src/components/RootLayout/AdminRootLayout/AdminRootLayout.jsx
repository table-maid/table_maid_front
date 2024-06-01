/** @jsxImportSource @emotion/react */
import * as s from "./style";

function AdminRootLayout({ children }) {
  return (
    <>
      <div css={s.layout}>
        <div css={s.container}>{children}</div>
      </div>
    </>
  );
}

export default AdminRootLayout;
