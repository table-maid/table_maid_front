/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserApis from "../../../hooks/useUserApis";

function UserMainPage() {
  const { adminInfo, menuList, categoryList, setCategoryId } = useUserApis();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleMenuClick = (menuId, categoryId) => {
    navigate(`/user/details?menuId=${menuId}&categoryId=${categoryId}`);
  };

  useEffect(() => {
    console.log(adminInfo.companyNumber);
  }, []);

  return (
    <div css={s.layout}>
      <div css={s.button}>
        <button>직원호출</button>
        <button>주문내역</button>
      </div>
      <div>매장명: {adminInfo.companyName}</div>
      {categoryList.map((category) => (
        <div
          key={category.menuCategoryId}
          onClick={() => handleCategoryClick(category.menuCategoryId)}
        >
          <div>카테고리명: {category.menuCategoryName}</div>
        </div>
      ))}
      <div>
        {menuList.length > 0 && (
          <div>
            <h3>메뉴 리스트</h3>
            {menuList.map((menu) => (
              <div
                key={menu.menuId}
                onClick={() => handleMenuClick(menu.menuId, menu.menuCategoryId)}
              >
                <div>메뉴명: {menu.menuName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMainPage;
