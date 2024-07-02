/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCategoriesRequest, getCompanyNumberRequest, getMenusRequest } from "../../../apis/api/user";

function UserMainPage() {
  const navigate = useNavigate();
  const { companyNumber, tableNumber } = useParams();
  const [numberBasket, setNumberBasket] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [adminId, setAdminId] = useState(0);

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
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

  return (
    <div css={s.layout}>
      <div css={s.button}>
        <button>직원호출</button>
        <button>주문내역</button>
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
        {menuList.length > 0 && (
          <div>
            <h3>메뉴 리스트</h3>
            {menuList.map((menu) => (
              <div
                key={menu.menuId}
                onClick={() =>
                  handleMenuClick(menu.menuId, menu.menuCategoryId)
                }
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
