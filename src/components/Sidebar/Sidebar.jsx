/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";

function Sidebar() {
  const [isShow, setShow] = useState(false);

  return (
      <aside css={s.layout(isShow)}>
        <button css={s.button} onClick={() => setShow(!isShow)}></button>
        <ul css={s.menuList}></ul>
        fsd
      </aside>
  );
}

export default Sidebar;
