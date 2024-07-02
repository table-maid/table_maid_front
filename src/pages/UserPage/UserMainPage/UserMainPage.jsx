/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCategoriesRequest, getCompanyNumberRequest, getMenusRequest } from "../../../apis/api/user";
import { useEffect, useRef, useState } from "react";
import useUserApis from "../../../hooks/useUserApis";

function UserMainPage() {
  const navigate = useNavigate();
  const { companyNumber, tableNumber } = useParams();
  const [numberBasket, setNumberBasket] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [adminId, setAdminId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryBoxRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
    setSelectedCategory(categoryId);
  };

  const handleMenuClick = (menuId, categoryId) => {
    const adminId = numberBasket && numberBasket.adminId;

    if (adminId) {
      navigate(
        `/user/details?menuId=${menuId}&categoryId=${categoryId}&adminId=${adminId}`
      );
    }
  };

  useEffect(() => {
    setAdminId(numberBasket.adminId);
  }, [adminId]);

  useEffect(() => {
    if (categoryList.length > 0) {
      setCategoryId(categoryList[0].menuCategoryId);
    }
    console.log(categoryId);
  }, [categoryList]);

  const companyNumberUseQuery = useQuery(
    ["companyNumberUseQuery", companyNumber],
    () =>
      getCompanyNumberRequest({
        companyNumber: companyNumber,
      }),
    {
      enabled: !!companyNumber,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setNumberBasket(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const getCategoriesQuery = useQuery(
    ["getCategoriesQuery"],
    () =>
      getCategoriesRequest({
        adminId: numberBasket.adminId,
      }),
    {
      enabled: !!numberBasket.adminId,
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

  const getMenusQuery = useQuery(
    ["getMenusQuery", categoryId],
    () =>
      getMenusRequest({
        adminId: numberBasket.adminId,
        menuCategoryId: categoryId,
      }),
    {
      enabled: !!numberBasket.adminId && !!categoryId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setMenuList(response.data);
        console.log(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  
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

  return (
    <div css={s.layout}>
      <div css={s.buttonBox}>
        <button css={s.button}>직원호출</button>
        <button css={s.button}>주문내역</button>
      </div>
      <div css={s.storeName}>{numberBasket.companyName}</div>
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

      <div>매장명: {numberBasket.companyName}</div>
      {categoryList.map((category) => (
        <div
          key={category.menuCategoryId}
          onClick={() => handleCategoryClick(category.menuCategoryId)}
        >
          <div>카테고리명: {category.menuCategoryName}</div>
        </div>
      ))}
      <div>
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
