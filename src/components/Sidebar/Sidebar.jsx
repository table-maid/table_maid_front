/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

function Sidebar() {
  const [isShow, setShow] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const navigate = useNavigate();

  const handleOpenButtonClick = () => {
    setShow(true);
    setButtonVisible(false);
  };

  const handleCloseButtonClick = () => {
    setShow(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 400);
  };

  const handleHomeButtonClick = () => {
    handleCloseButtonClick();
    navigate("/main");
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseButtonClick();
  };

  return (
    <aside css={s.layout(isShow)}>
      <button
        css={s.openButton(isButtonVisible)}
        onClick={handleOpenButtonClick}
      >
        <FaBars size="30" />
      </button>
      {isShow && (
        <div>
          <button css={s.closeButton} onClick={handleCloseButtonClick}>
            <IoClose size={"30"} />
          </button>
          <button css={s.homeButton} onClick={handleHomeButtonClick}>
            <FaHome size={"30"} />
          </button>
          <ul css={s.menuList}>
            <li css={s.menuItem}>
              <Link to={"/sales/home"} css={s.link} onClick={() => handleMenuItemClick("/sales/sale")}>
                매출 조회
              </Link>
            </li>
            <li css={s.menuItem}>
              <Link to={"/sales/menu"} css={s.link} onClick={() => handleMenuItemClick("/sales/menu")}>
                메뉴 매출 조회
              </Link>
            </li>
            <li css={s.menuItem}>
              <Link to={"/menu/view"} css={s.link} onClick={() => handleMenuItemClick("/menu/view")}>
                메뉴 관리
              </Link>
            </li>
            <li css={s.menuItem}>
              <Link to={"/menu/management/list"} css={s.link} onClick={() => handleMenuItemClick("/menu/management/list")}>
                매장 단품 메뉴 관리
              </Link>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;