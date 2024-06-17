/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useQuery } from "react-query";
import { useState } from "react";
import MenuButton from "../../../components/Sales/MenuButton/MenuButton";
import { useNavigate } from "react-router-dom";
import { searchMenuListRequest } from "../../../apis/api/menuManagentApi";
import useGetMenus from "../../../hooks/useGetMenu";
import useCategory from "../../../hooks/useCategory";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useRecoilState } from "recoil";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";

function MenuListPage(props) {
  const [adminId] = useRecoilState(adminIdState);
  const [menuList, setMenuList] = useState([]);
  const [menuSalesList, setMenuSalesList] = useState(menuList);
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(0);
  const { categories, error: categoriesError } = useCategory(adminId);
  const {
    menus,
    error: menusError,
    uniqueMenuCategoryNames,
  } = useGetMenus(adminId, categoryId);

  const menu = {
    categoryName: uniqueMenuCategoryNames,
    menuName: menus,
  };

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

  const handleMenuClick = (menuId) => {
    navigate(`/sales/menu/detail/${menuId}`);
  };

  const handleCategoryId = (category) => {
    setCategoryId(category);
  };

  return (
    <AdminPageLayout>
      <div css={s.layout}>
        <div css={s.header}>
          <div css={s.title}>메뉴 매출 조회</div>
        </div>
        <div css={s.main}>
          <div css={s.ListLayout}>
            <div css={s.list}>
              {categories.map((cat) => (
                <button
                  css={s.categorieButton}
                  onClick={() => handleCategoryId(cat.menuCategoryId)}
                  key={cat.menuCategoryId}
                >
                  {cat.menuCategoryName}
                </button>
              ))}
              {menu.categoryName?.map((category) => (
                <div key={category}>
                  <div css={s.menulist}>
                    {menu.menuName
                      .filter(
                        (menuItem) => menuItem.menuCategoryName === category
                      )
                      .map((menuItem) => (
                        <MenuButton
                          key={menuItem.menuId}
                          onClick={() => handleMenuClick(menuItem.menuId)}
                          menuName={menuItem.menuName}
                          img={menuItem.menuImgUrl}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}

export default MenuListPage;
