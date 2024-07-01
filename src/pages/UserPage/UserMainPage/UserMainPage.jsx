/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserApis from "../../../hooks/useUserApis";

function UserMainPage() {
  const { adminInfo, menuList, categoryList, setCategoryId } = useUserApis();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
    setSelectedCategory(categoryId);
  };

  const handleMenuClick = (menuId, categoryId) => {
    navigate(`/user/details?menuId=${menuId}&categoryId=${categoryId}`);
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollBy({
        left: e.deltaY < 0 ? -200 : 200, // 스크롤 속도를 100으로 설정
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log(adminInfo.companyNumber);
  }, [adminInfo.companyNumber]);

  return (
    <div css={s.layout}>
      <div css={s.buttonBox}>
        <button css={s.button}>직원호출</button>
        <button css={s.button}>주문내역</button>
      </div>
      <div css={s.storeName}>{adminInfo.companyName}</div>
      <div css={s.categoryBox} onWheel={handleWheel}>
        {categoryList.map((category) => (
          <div
            key={category.menuCategoryId}
            onClick={() => handleCategoryClick(category.menuCategoryId)}
            css={selectedCategory === category.menuCategoryId ? s.selectedCategory : s.categor}
          >
            {category.menuCategoryName}
          </div>
        ))}
      </div>
      <div css={s.listBox}>
        {menuList.length > 0 && (
          <div>
            {menuList.map((menu) => (
              <div
                css={s.menuList}
                key={menu.menuId}
                onClick={() =>
                  handleMenuClick(menu.menuId, menu.menuCategoryId)
                }
              >
                <div>{menu.menuName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMainPage;
