/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from "react";
import useInsertMenu from "../../../hooks/useInsertMenu";
import useCategory from "../../../hooks/useCategory";
import useCategoryInsert from "../../../hooks/useCategoryInsert";
import useGetMenus from "../../../hooks/useGetMenu";
import useGetOption from "../../../hooks/useGetOption";
import MenuRegisterModal from "../../../components/Menu/MenuRegisterModal/MenuRegisterModal";
import OptionRegisterModal from "../../../components/Menu/OptionRegisterModal/OptionRegisterModal";
import CategoryRegisterModal from "../../../components/Menu/CategoryRegisterModal/CategoryRegisterModal";

function MenuManagementPage(props) {
  const [adminId, setAdminId] = useState(1);
  const [companyName, setCompanyName] = useState("test");
  const [categoryPageNum, setCategoryPageNum] = useState(0);
  const { categories, error: categoriesError } = useCategory(
    adminId,
    categoryPageNum
  );
  const [categoryId, setCategoryId] = useState(0);
  const [menuId, setMenuId] = useState(0);
  const [selectItenm, setSelectItem] = useState(false);
  const {
    menus,
    error: menusError,
    uniqueMenuCategoryNames,
  } = useGetMenus(adminId, categoryId);
  const { options, error: optionsError } = useGetOption(adminId, menuId);
  const [recommend, setRecommend] = useState(false);
  const { menuName, menuPrice, setMenuName, setMenuPrice, insertMenu } =
    useInsertMenu(categories, adminId, recommend);
  const { categoryName } = useCategoryInsert(adminId);
  const [menuModal, setMenuModal] = useState(0);
  const [optionModal, setOptionModal] = useState(0);
  const [modalMenuName, setModalMenuName] = useState();
  const [categoryModal, setCategoryModal] = useState(0);

  useEffect(() => {
    setMenuId(0);
  }, [categoryId]);

  const menu = {
    categoryName: uniqueMenuCategoryNames,
    menuName: menus,
  };

  const handleCategoryId = (category) => {
    setCategoryId(category);
  };

  const menuInsertModal = () => {
    setMenuModal(1);
  };

  const categoryInsertModal = () => {
    setCategoryModal(1);
  };

  const handleRecommendChange = (e) => {
    setRecommend(e.target.checked);
  };
  const handleSelectedCategoryId = (id) => {
    setCategoryId(categoryId === id ? null : id);
  };
  const handleSelectedMenu = (id, name) => {
    if (menuId !== id) {
      setMenuId(id);
      setModalMenuName(name);
      setSelectItem(true);
    }
  };

  const handleRegisterOptionButton = () => {
    if (menuId === 0) {
      alert("메뉴를 선택해주세요");
    } else {
      setOptionModal(1);
    }
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.title}>
          <h3>메뉴관리</h3>
        </div>
        <div css={s.view}>
          {menuModal !== 0 && (
            <MenuRegisterModal
              categories={categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              setMenuName={setMenuName}
              setMenuPrice={setMenuPrice}
              insertMenu={insertMenu}
              categoryName={categoryName}
              recommend={recommend}
              handleRecommendChange={handleRecommendChange}
              setMenuModal={setMenuModal}
            />
          )}
          <div css={s.managementLayout}>
            <div css={s.categoryLayout}>
              <div>
                <button onClick={categoryInsertModal}>카테고리 추가</button>
              </div>
              {categoriesError && (
                <div>에러가 발생했습니다: {categoriesError.message}</div>
              )}
              {categoryModal !== 0 && (
                <CategoryRegisterModal
                  companyName={companyName}
                  setCategoryModal={setCategoryModal}
                />
              )}

              <h3 onClick={() => handleCategoryId(0)}>전체</h3>
              {categories.map((cat) => (
                <div
                  css={
                    categoryId === cat.menuCategoryId
                      ? s.selectedCategoryStyle
                      : null
                  }
                  onClick={() => handleSelectedCategoryId(cat.menuCategoryId)}
                  key={cat.menuCategoryId}
                >
                  <div css={s.contentBox}>{cat.menuCategoryName}</div>
                  <input
                    css={s.hiddenCheckbox}
                    type="checkbox"
                    checked={categoryId === cat.menuCategoryId}
                    onChange={() =>
                      handleSelectedCategoryId(cat.menuCategoryId)
                    }
                  />
                </div>
              ))}
            </div>
            <div css={s.menuLayout}>
              <div>
                <button onClick={menuInsertModal}>메뉴 추가</button>
              </div>
              {menu.categoryName?.map((category) => (
                <div key={category}>
                  <h3>{category}</h3>
                  {menu.menuName
                    .filter(
                      (menuItem) => menuItem.menuCategoryName === category
                    )
                    .map((menuItem) => (
                      <div
                        css={
                          menuId === menuItem.menuId
                            ? s.selectedMenuStyle
                            : null
                        }
                        onClick={() =>
                          handleSelectedMenu(menuItem.menuId, menuItem.menuName)
                        }
                        key={menuItem.menuCode}
                      >
                        <div css={s.contentBox}>
                          <div>{menuItem.menuName}</div>
                          <p>가격: {menuItem.menuPrice}원</p>
                        </div>
                        <div style={{ marginRight: "20px" }}>
                          <input
                            css={s.hiddenCheckbox}
                            type="checkbox"
                            checked={menuId === menuItem.menuId}
                            onChange={() => {
                              if (menuId !== menuItem.menuId) {
                                handleSelectedMenu(
                                  menuItem.menuId,
                                  menuItem.menuName
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div css={s.optionLayout}>
              <div>
                <button onClick={() => handleRegisterOptionButton()}>
                  옵션 추가
                </button>
              </div>
              {optionModal !== 0 && (
                <OptionRegisterModal
                  optionModal={optionModal}
                  closeModal={() => setOptionModal(0)}
                  options={options}
                  menuId={menuId}
                  menuName={modalMenuName}
                />
              )}
              <div>
                {options?.map((optionItem, index) => (
                  <div key={index}>
                    <h3>{optionItem.titleName}</h3>
                    <div>
                      {optionItem.optionNames.map((name, idx) => (
                        <div key={idx}>
                          <div css={s.contentBox}>
                            <div>{name}</div>+ {optionItem.optionPrices[idx]}원
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuManagementPage;
