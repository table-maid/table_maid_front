/**@jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { AiFillShopping } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { companyNumberState, tableNumberState } from "../../atoms/UserNumberStateAtom";

function RootHeader() {
  const companyNumber = useRecoilValue(companyNumberState);
  const tableNumber = useRecoilValue(tableNumberState);
  const navigate = useNavigate();

  const handleShoppingClick = () => {
    navigate(`/user/shopping`);
  };

  const handleHomeClick = () => {
    navigate(`/user/main/${companyNumber}/${tableNumber}`);
  };

  return (
    <div css={s.layout}>
      <AiFillShopping onClick={handleShoppingClick} size={30} css={s.icon} />
      <FaHome onClick={handleHomeClick} size={30} css={s.icon} />
    </div>
  );
}

export default RootHeader;
