/**@jsxImportSource @emotion/react */
import SideBar from "../../Sidebar/Sidebar";
import * as s from "./style";


function AdminRootContainer({ children }) {
  return (
    <div css={s.layout}>
      <div css={s.sideBar}>
        <SideBar />
      </div>
      {children}
    </div>
  );
}

export default AdminRootContainer;
