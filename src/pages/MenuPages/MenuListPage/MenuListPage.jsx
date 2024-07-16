/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from "react";
import { removeMenu, serachMenuList } from "../../../apis/api/menuManagentApi";
import MenuRegisterModal from "../../../components/Menu/MenuRegisterModal/MenuRegisterModal";
import useInsertMenu from "../../../hooks/useInsertMenu";
import useCategory from "../../../hooks/useCategory";
import { useNavigate } from "react-router-dom";
import AdminPageLayout from "../../../components/AdminPageLayout/AdminPageLayout";
import { IoIosArrowDown } from "react-icons/io";

function MenuListPage(props) {
  const adminId = 1;
  const [menuList, setMenuList] = useState([]);
  const [menuModal, setMenuModal] = useState(false);
  const [menuCategoryId, setCategoryId] = useState(0);
  const [recommend, setRecommend] = useState(0);
  const [searchMenuName, setSearchMenuName] = useState("");
  const [menuCode, setMenuCode] = useState("");
  const [inputState, setInputState] = useState();
  const [menuState, setMenuState] = useState(0);
  const [recommendMenu, setRecommendMenu] = useState(0);
  const { categories, error: categoriesError } = useCategory(adminId, 0);
  const { menuName, menuPrice, setMenuName, setMenuPrice, insertMenu } =
    useInsertMenu(categories, adminId, recommend);
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchMenuName("");
    setMenuCode("");
  }, [inputState]);

  useEffect(() => {
    initializeState();
    getMenuList();
  }, []);

  const handleCheckboxChange = (menuId) => {
    if (selectedMenuIds.includes(menuId)) {
      setSelectedMenuIds(selectedMenuIds.filter((id) => id !== menuId));
    } else {
      setSelectedMenuIds([...selectedMenuIds, menuId]);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = Number(e.target.value);
    setCategoryId(selectedCategoryId);
  };

  const initializeState = () => {
    setMenuState(0);
    setRecommendMenu(0);
    setSearchMenuName("");
    setMenuCode("");
    setCategoryId(0);
  };

  const deleteMenu = async () => {
    try {
      const param = {
        adminId: adminId,
        menuIds: selectedMenuIds,
      };
      await removeMenu(param);
      alert("삭제가 완료되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchMenuName = (e) => {
    setSearchMenuName(e.target.value);
    setMenuCode("");
  };

  const handleSearchMenuCode = (e) => {
    setMenuCode(e.target.value);
    setSearchMenuName("");
  };

  const getMenuList = async () => {
    try {
      const params = {
        adminId: adminId,
        menuName: searchMenuName,
        menuCode: menuCode,
        menuState: menuState,
        recommendMenu: recommendMenu,
        menuCategoryId: menuCategoryId,
      };
      const response = await serachMenuList(params);
      console.log(params);
      console.log(inputState);
      setMenuList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecommendChange = (e) => {
    setRecommend(e.target.checked);
  };

  const openMenuModal = () => {
    setMenuModal(true);
  };

  const closeMenuModal = () => {
    setMenuModal(false);
  };

  return (
    <div css={s.layout}>
      {menuModal === true ? (
        <MenuRegisterModal
          categories={categories}
          menuCategoryId={menuCategoryId}
          setCategoryId={setCategoryId}
          setMenuName={setMenuName}
          setMenuPrice={setMenuPrice}
          insertMenu={insertMenu}
          categoryName={
            categories.find((cat) => cat.menuCategoryId === menuCategoryId)
              ?.menuCategoryName || ""
          }
          recommend={recommend}
          handleRecommendChange={handleRecommendChange}
          setMenuModal={setMenuModal}
        />
      ) : (
        <></>
      )}
      <div css={s.layout}>
        <div css={s.filterLayout}>
          <h1>매장단품 메뉴관리</h1>
          <div css={s.filterActions}>
            <button onClick={getMenuList} type="button">
              검색
            </button>
            <button onClick={initializeState} type="reset">
              초기화
            </button>
            <button type="button" onClick={openMenuModal}>
              등록
            </button>
            <button onClick={deleteMenu} type="button">
              삭제
            </button>
          </div>
          <div css={s.filterInputs}>
            <div>
              <label htmlFor="storeName">매장명</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={"테스트 매장"}
                disabled
              />
            </div>
            <div>
              <label htmlFor="saleState">판매 상태</label>
              <div css={s.selectWrapper}>
                <select
                  value={menuState}
                  onChange={(e) => setMenuState(e.target.value)}
                  id="saleState"
                  name="saleState"
                >
                  <option value="0">전체</option>
                  <option value="1">판매 중</option>
                  <option value="2">매진</option>
                </select>
                <IoIosArrowDown className="select-arrow" />
              </div>
            </div>
            <div>
              <label htmlFor="recommendMenu">추천</label>
              <div css={s.selectWrapper}>
                <select
                  value={recommendMenu}
                  onChange={(e) => setRecommendMenu(e.target.value)}
                  id="recommendMenu"
                  name="recommendMenu"
                >
                  <option value="0">전체</option>
                  <option value="1">일반 메뉴</option>
                  <option value="2">추천 메뉴</option>
                </select>
                <IoIosArrowDown className="select-arrow" />
              </div>
            </div>
            <div>
              <label htmlFor="categories">카테고리 분류</label>
              <div css={s.selectWrapper}>
                <select
                  name="categories"
                  id="categories"
                  value={menuCategoryId}
                  onChange={handleCategoryChange}
                >
                  <option value={0}>카테고리 선택</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.menuCategoryId}
                      value={cat.menuCategoryId}
                      data-name={cat.menuCategoryName}
                    >
                      {cat.menuCategoryName}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="select-arrow" />
              </div>
            </div>
            <div>
              <label htmlFor="menuType">검색어</label>
              <label css={s.selectWrapper}>
                <select
                  onChange={(e) => setInputState(e.target.value)}
                  id="menuType"
                  name="menuType"
                >
                  <option value="1">메뉴코드</option>
                  <option value="2">메뉴이름</option>
                </select>
                <IoIosArrowDown className="select-arrow" />
              </label>
              <input
                value={inputState === "1" ? menuCode : searchMenuName}
                type="text"
                onChange={
                  inputState === "1"
                    ? handleSearchMenuCode
                    : handleSearchMenuName
                }
              />
              <div>
                ※ 메뉴명 클릭 시 메뉴 상세페이지로 이동합니다.
              </div>
            </div>
          </div>
        </div>
        <div css={s.menu}>
          <div css={s.menuListLayout}>
            <table css={s.tableLayout}>
              <thead>
                <tr>
                  <th style={{ width: '5%' }} >선택</th>
                  <th style={{ width: '5%' }}>브랜드</th>
                  <th style={{ width: '5%' }}>메뉴코드</th>
                  <th style={{ width: '15%' }}>메뉴명</th>
                  <th style={{ width: '7%' }}>판매가</th>
                  <th style={{ width: '5%' }}>추천</th>
                  <th style={{ width: '5%' }}>판매상태</th>
                  <th style={{ width: '5%' }}>카테고리</th>
                </tr>
              </thead>
              <tbody>
                {menuList?.map((menu) => (
                  <tr key={menu.menuId}>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>
                      <input
                        type="checkbox"
                        name="menuCheck"
                        id={`menuCheck-${menu.menuId}`}
                        checked={selectedMenuIds.includes(menu.menuId)}
                        onChange={() => handleCheckboxChange(menu.menuId)}
                      />
                    </td>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>{menu.companyName}</td>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>
                      {menu.menuCode}
                    </td>
                    <td
                      onClick={() =>
                        navigate(`/menu/management/detail/${menu.menuId}`)
                      }
                    >
                      {menu.menuName}
                    </td>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>{menu.menuPrice}원</td>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>{menu.recommendMenu !== 1 ? "추천" : "일반"}</td>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>{menu.menuState === 1 ? "판매 중" : "매진"}</td>
                    <td onClick={() => handleCheckboxChange(menu.menuId)}>{menu.menuCategoryName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuListPage;
