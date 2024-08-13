/**@jsxImportSource @emotion/react */
import * as s from "./style";
import { FaWifi } from "react-icons/fa";
import { CiBatteryFull } from "react-icons/ci";
import { TbAntennaBars5 } from "react-icons/tb";
import UserCurrentTime from "../../UserCurrentTime/UserCurrentTime";

function UserRootContainer({ children }) {
  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.headerBox}>
          <div css={s.iphone}></div>
          <div css={s.icon}>
            <UserCurrentTime />
            <div>
              <TbAntennaBars5 size={20} /> <FaWifi size={20} /> <CiBatteryFull size={20} />
            </div>
          </div>
        </div>
      </div>
      <div css={s.container}>
        {children}
      </div>
    </div>
  );
}

export default UserRootContainer;
