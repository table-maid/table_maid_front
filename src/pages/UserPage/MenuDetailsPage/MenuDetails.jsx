/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { searchOptionRequest } from "../../../apis/api/menuManagentApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCompanyNameRequest, getSoloMenuRequest } from "../../../apis/api/user";
import { useRecoilState } from "recoil";
import { ShoppingCartState } from "../../../atoms/ShoppingCartAtom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import useUserApis from "../../../hooks/useUserApis";

function MenuDetails() {
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchParams] = useSearchParams();
  const menuId = searchParams.get("menuId");
  const categoryId = searchParams.get("categoryId");
  const adminId = searchParams.get("adminId");
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cart, setCart] = useRecoilState(ShoppingCartState);
   const { adminInfo } = useUserApis();
  const [count, setCount] = useState(1);

  const [companyName, setCompanyName] = useState("");


  const soloMenuQuery = useQuery(
    ["soloMenuQuery", adminId, categoryId],
    () =>
      getSoloMenuRequest({
        adminId: adminId,
        menuCategoryId: categoryId,
        menuId: menuId,
      }),
    {
      enabled: !!adminId && !!categoryId && !!menuId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setSelectedMenu(response.data);
        console.log(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const searchOptionQuery = useQuery(
    ["searchOptionQuery"],
    () =>
      searchOptionRequest({
        adminId: adminId,
        menuId: menuId,
      }),
    {
      enabled: !!adminId && !!menuId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setOptionList(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

      const getCompanyNameQuery = useQuery(
        ["getCompanyNameQuery"],
        () =>
          getCompanyNameRequest({
            adminId: adminId,
          }),
        {
          enabled: !!adminId,
          retry: 0,
          refetchOnWindowFocus: false,
          onSuccess: (response) => {
            setCompanyName(response.data);
            console.log(response.data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );

  useEffect(() => {
    console.log(adminId);
  }, [adminId]);

  useEffect(() => {
    if (!searchOptionQuery.isLoading && !searchOptionQuery.isFetching) {
      setOptionList(searchOptionQuery.data?.data);
    }
  }, [searchOptionQuery]);

  const handleCheckboxChange = (optionId, optionName, optionPrice) => {
    setSelectedOptions((prevSelectedOptions) => {
      const isOptionSelected = prevSelectedOptions.some(
        (opt) => opt.optionId === optionId && opt.optionName === optionName
      );

      if (isOptionSelected) {
        return prevSelectedOptions.filter(
          (opt) => !(opt.optionId === optionId && opt.optionName === optionName)
        );
      } else {
        return [
          ...prevSelectedOptions,
          { optionId, optionName, optionPrice: parseInt(optionPrice, 10) },
        ];
      }
    });
  };

  const handleShoppingClick = () => {
    setCart((prevCart) => [
      ...prevCart,
      { menu: selectedMenu, options: selectedOptions, count },
    ]);

    navigate(`/user/shopping?adminId=${adminId}`);
  };

  const handleIncreaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseCount = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <h1>{adminInfo?.companyName}</h1>
        <div css={s.img}>
          {selectedMenu !== null ? (
            <img src={selectedMenu.menuImgUrl} alt="" />
          ) : (
            <div>이미지가 없습니다</div>
          )}
        </div>
        <div css={s.menuList}>
          <h1>{selectedMenu?.menuName}</h1>
          <div css={s.price}>
            <h2>가격</h2>
            <h2>{selectedMenu?.menuPrice} 원</h2>

          </div>
        </div>
        <div css={s.optionBox}>
          {optionList.length > 0 ? (
            <div>
              {optionList.map((option) => (
                <div key={option.optionTitleId} css={s.optionName}>
                  <h2>{option.titleName}</h2>
                  {option.optionNames.map((name, index) => (
                    <h3 key={name}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedOptions.some(
                            (opt) =>
                              opt.optionId === option.optionTitleId &&
                              opt.optionName === name
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              option.optionTitleId,
                              name,
                              option.optionPrices[index]
                            )
                          }
                        />
                        {name} ( + {option.optionPrices[index]} )
                      </label>
                    </h3>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div css={s.countBox}>
          <h2>수량</h2>
          <div css={s.count}>
            <button onClick={handleDecreaseCount}>
              <FaMinus size={20}/>
            </button>
            <span>{count}</span>
            <button onClick={handleIncreaseCount}>
              <FaPlus size={20}/>
            </button>
          </div>
        </div>
      </div>
      <div css={s.buttonBox}>
        <button onClick={() => handleShoppingClick()}>장바구니 담기</button>
      </div>
    </div>
  );
}

export default MenuDetails;
