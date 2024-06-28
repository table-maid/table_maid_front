/**@jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { AiFillShopping } from "react-icons/ai";
import { FaHome } from "react-icons/fa";

function RootHeader(props) {
    const navigate = useNavigate();

    const handleShoppingClick = () => {
        navigate(`/user/shopping`);
    }

    const handleHomeClick = () => {
        navigate(`/user/main`);
    }

  return (
    <div css={s.layout}>
        <div>
            <AiFillShopping onClick={handleShoppingClick}/>
            <FaHome onClick={handleHomeClick} />
        </div>
    </div>
  );
}

export default RootHeader;
