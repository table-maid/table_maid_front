/** @jsxImportSource @emotion/react */
import useUserApis from "../../../hooks/useUserApis";
import * as s from "./style";

function MenuDetails(props) {
    const { adminInfo } = useUserApis();

  return (
    <div css={s.layout}>
      <div>{adminInfo.companyName}</div>
      <h1>ㅎㅇ</h1>
    </div>
  );
}

export default MenuDetails;
