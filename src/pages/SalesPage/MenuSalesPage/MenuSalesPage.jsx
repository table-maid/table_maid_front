/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useQuery } from "react-query";
import { getMenuTotalSalesRequest } from "../../../apis/api/salesApi";
import { useState } from "react";
import MenuButton from "../../../components/Sales/MenuButton/MenuButton";
import { useNavigate } from "react-router-dom";
import { searchMenuListRequest } from "../../../apis/api/menuManagentApi";

function MenuSalesPage(props) {
  const [adminId, setAdminId] = useState(1);
  const [menuSales, setMenuSales] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const navigate = useNavigate();

  const selectMenuSalesQuery = useQuery(
    "selectSalesQuery",
    getMenuTotalSalesRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log(response.data);
        setMenuSales(response.data);
      },
      onError: (error) => {
        console.log("에러 :", error);
      },
    }
  );

  const selectMenuListQuery = useQuery(
    ["selectMenuListQuery"],
    () => searchMenuListRequest(adminId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log(response.data);
        setMenuList(response.data);
      },
      onError: (error) => {
        console.log("에러 :", error);
      },
    }
  );

  const handleMenuClick = (id) => {
    navigate(`/admin/sale/menu?menuId=${id}`);
  };

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.title}>메뉴 매출 조회</div>
      </div>
      <div css={s.main}>
        <div css={s.ListLayout}>
          <div css={s.list}>
            {menuList.map((menu) => (
              <MenuButton
                key={menu.menuId}
                onClick={() => handleMenuClick(menu.menuId)}
                menuName={menu.menuName}
                img={menu.menuIngUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSalesPage;
