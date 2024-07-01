/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserApis from "../../../hooks/useUserApis";

function UserMainPage() {
  const { adminInfo, menuList, categoryList, setCategoryId } = useUserApis();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryBoxRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
    setSelectedCategory(categoryId);
  };

  const handleMenuClick = (menuId, categoryId) => {
    navigate(`/user/details?menuId=${menuId}&categoryId=${categoryId}`);
  };

  useEffect(() => {
    const categoryBox = categoryBoxRef.current;

    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        categoryBox.scrollLeft += event.deltaY;
      }
    };

    if (categoryBox) {
      categoryBox.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (categoryBox) {
        categoryBox.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

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
      <div css={s.categoryBox} ref={categoryBoxRef}>
        {categoryList.map((category) => (
          <div
            key={category.menuCategoryId}
            onClick={() => handleCategoryClick(category.menuCategoryId)}
            css={
              selectedCategory === category.menuCategoryId
                ? s.selectedCategory
                : s.categor
            }
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
                <div css={s.menu}>
                  <h3>{menu.menuName}</h3>
                  <div>{menu.menuPrice} 원</div>
                </div>
                  <img src={menu.menuImgUrl} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMainPage;
