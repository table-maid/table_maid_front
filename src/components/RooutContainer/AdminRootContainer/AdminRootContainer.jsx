/**@jsxImportSource @emotion/react */
import SideBar from "../../Sidebar/Sidebar";
import * as s from "./style";


function AdminRootContainer({ children }) {
  return (
    <div css={s.layout}>
      {children}
    </div>
  );
}

export default AdminRootContainer;
