/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import useUserApis from "../../../hooks/useUserApis";
import * as s from "./style";
import { searchOptionRequest } from "../../../apis/api/menuManagentApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSoloMenuRequest } from "../../../apis/api/user";
import { useRecoilState } from "recoil";
import { ShoppingCartState } from "../../../atoms/ShoppingCartAtom";

function MenuDetails() {
  const { adminInfo } = useUserApis();
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchParams] = useSearchParams();
  const menuId = searchParams.get("menuId");
  const categoryId = searchParams.get("categoryId");
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cart, setCart] = useRecoilState(ShoppingCartState);

  const soloMenuQuery = useQuery(
    ["soloMenuQuery", adminInfo.adminId, categoryId],
    () =>
      getSoloMenuRequest({
        adminId: adminInfo.adminId,
        menuCategoryId: categoryId,
        menuId: menuId
      }),
    {
      enabled: !!adminInfo.adminId && !!categoryId && !!menuId,
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        setSelectedMenu(response.data);
        console.log(response.data)
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
        adminId: adminInfo.adminId,
        menuId: menuId,
      }),
    {
      enabled: !!adminInfo.adminId && !!menuId,
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

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

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
            (opt) =>
              !(opt.optionId === optionId && opt.optionName === optionName)
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
      { menu: selectedMenu, options: selectedOptions },
    ]);
    navigate(`/user/shopping`);
  };

  return (
    <div css={s.layout}>
      <div>{adminInfo?.companyName}</div>
      <div>
        {selectedMenu !== null ? (
          <img src={selectedMenu.menuImgUrl} alt="메뉴 이미지" />
        ) : (
          <div>이미지가 없습니다</div>
        )}
      </div>
      <div>
        {optionList.length > 0 ? (
          <div>
            {optionList.map((option) => (
              <div key={option.optionTitleId}>
                옵션제목: {option.titleName}
                {option.optionNames.map((name, index) => (
                  <div key={name}>
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>옵션이 없습니다</div>
        )}
      </div>
      <button onClick={() => handleShoppingClick()}>장바구니 담기</button>
    </div>
  );
}

export default MenuDetails;
