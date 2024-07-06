/**@jsxImportSource @emotion/react */
import { useState } from "react";
import SideBar from "../../Sidebar/Sidebar";
import * as s from "./style";

function AdminRootContainer({ children }) {
  const [isShow, setIsShow] = useState(false);
  return (
    <div css={s.layout}>
      <div css={s.sideBar}>
        <SideBar />
      </div>
      <div css={s.content(isShow)}>
        {children}
      </div>
    </div>
  );
}

export default AdminRootContainer;
