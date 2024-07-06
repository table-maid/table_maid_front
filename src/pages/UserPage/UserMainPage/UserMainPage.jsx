/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getCategoriesRequest,
  getCompanyNumberRequest,
  getMenusRequest,
} from "../../../apis/api/user";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  companyNumberState,
  tableNumberState,
} from "../../../atoms/UserNumberStateAtom";

function UserMainPage() {
  const navigate = useNavigate();
  const { companyNumber, tableNumber } = useParams();
  const setCompanyNumber = useSetRecoilState(companyNumberState);
  const setTableNumber = useSetRecoilState(tableNumberState);
  const [numberBasket, setNumberBasket] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const categoryBoxRef = useRef(null);

  useEffect(() => {
    setCompanyNumber(companyNumber);
    setTableNumber(tableNumber);
  }, [companyNumber, tableNumber, setCompanyNumber, setTableNumber]);

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

  const handleEmployeeCallClick = () => {
    navigate(`/user/call`);
  };
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
        adminId: numberBasket && numberBasket.adminId,
      }),
    {
      enabled: !!numberBasket?.adminId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setCategoryList(response.data);
        if (response.data.length > 0) {
          setCategoryId(response.data[0].menuCategoryId);
        }
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
        adminId: numberBasket && numberBasket.adminId,
        menuCategoryId: categoryId,
      }),
    {
      enabled: !!numberBasket?.adminId && !!categoryId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setMenuList(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  
  useEffect(() => {
    const categoryBox = categoryBoxRef.current;

    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        categoryBox.scrollLeft += event.deltaY;
      }
    };

    if (categoryBox) {
      categoryBox.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (categoryBox) {
        categoryBox.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div css={s.layout}>
      <div css={s.buttonBox}>
        <button css={s.button} onClick={handleEmployeeCallClick}>직원호출</button>
        <button css={s.button}>주문내역</button>
      </div>
      <div css={s.storeName}>{numberBasket?.companyName}</div>
      <div css={s.categoryBox} ref={categoryBoxRef}>
        {categoryList.map((category) => (
          <div
            key={category.menuCategoryId}
            onClick={() => handleCategoryClick(category.menuCategoryId)}
            css={
              categoryId === category.menuCategoryId
                ? s.selectedCategory
                : s.category
            }
          >
            {category.menuCategoryName}
          </div>
        ))}
      </div>
      <div css={s.listBox}>
        {menuList.length > 0 &&
          menuList.map((menu) => (
            <div
              key={menu.menuId}
              css={s.menuList}
              onClick={() => handleMenuClick(menu.menuId, menu.menuCategoryId)}
            >
              <div css={s.menu}>
                <h3>{menu.menuName}</h3>
                <div>{menu.menuPrice} 원</div>
              </div>
              <img src={menu.menuImgUrl} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserMainPage;
