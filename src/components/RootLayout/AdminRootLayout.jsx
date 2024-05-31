/** @jsxImportSource @emotion/react */
import * as s from "./adminLayout";

function AdminRootLayout({ children }) {
  return (
    <>
        <div css={s.layout}>
            {children}
        </div>
    </>
  )
}

export default AdminRootLayout
