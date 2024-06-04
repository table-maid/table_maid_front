/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { getCategoriesRequest } from "../../../apis/api/user";
import { useState } from "react";
import useUserApis from "../../../hooks/useUserApis";

function MenuSelect() {
  const { adminInfo, menuList, setSelectedCategoryId } = useUserApis();
  const [categoryList, setCategoryList] = useState([]);

  const getCategoriesQuery = useQuery(
    ["getCategoriesQuery"],
    () =>
      getCategoriesRequest({
        adminId: adminInfo.adminId,
      }),
    {
      enabled: !!adminInfo.adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setCategoryList(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

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
              <div key={menu.menuId}>
                <div>메뉴명: {menu.menuName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuSelect;
