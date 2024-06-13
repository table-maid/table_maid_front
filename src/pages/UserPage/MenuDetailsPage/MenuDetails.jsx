/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import useUserApis from "../../../hooks/useUserApis";
import * as s from "./style";
import { searchOptionRequest } from "../../../apis/api/menuManagentApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MenuDetails({}) {
  const { adminInfo, menuList } = useUserApis();
  const [optionList, setOptionList] = useState([]);
  const { menuId } = useParams();
  const [selectedOptionNames, setSelectedOptionNames] = useState([]);

  useEffect(() => {
    console.log(menuId);
  }, [menuId]);

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

  const handleTitleClick = (optionNames) => {
    setSelectedOptionNames(optionNames);
  };



  useEffect(() => {
    if (!searchOptionQuery.isLoading && !searchOptionQuery.isFetching) {
      setOptionList(searchOptionQuery.data?.data);
    }
  }, [searchOptionQuery]);

  return (
    <div css={s.layout}>
      <div>{adminInfo?.companyName}</div>
      <div>
        {menuList ? (
          <div key={menuList.menuId}>이미지: {menuList.menuImgUrl}</div>
        ) : (
          <div>메뉴를 선택해주세요</div>
        )}
      </div>
      <div>
        {optionList ? (
          <div>
            {optionList.map((option) => (
              <div
                key={option.optionTitleId}
                onClick={() => handleTitleClick(option.optionNames)}
              >
                옵션제목: {option.titleName}
              </div>
            ))}
          </div>
        ) : (
          <div>옵션이 없습니다</div>
        )}
      </div>
      <div>
        {selectedOptionNames.length > 0 && (
          <div>
            <h3>선택된 옵션</h3>
            {selectedOptionNames.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuDetails;
