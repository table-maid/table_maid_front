/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import useInsertMenu from "../../../hooks/useInsertMenu";
import useCategory from "../../../hooks/useCategory";
import useCategoryInsert from "../../../hooks/useCategoryInsert";
import useGetMenus from "../../../hooks/useGetMenu";
import useGetOption from "../../../hooks/useGetOption";
import * as s from "./style";
import { registerOption, registerOptionTitle, searchOptionTitleRequest } from '../../../apis/api/menuManagentApi';
import useOptionTitle from '../../../hooks/useOptionTitle';
import useInsertOptionTitle from '../../../hooks/useInsertOptionTitle';
import MenuRegisterModal from '../../../components/Menu/MenuRegisterModal/MenuRegisterModal';
import OptionRegisterModal from '../../../components/Menu/OptionRegisterModal/OptionRegisterModal';

function MenuManagementPage(props) {
    const [adminId, setAdminId] = useState(1);
    const { categories, error: categoriesError } = useCategory(adminId);
    const [categoryId, setCategoryId] = useState(0);
    const [ menuId, setMenuId ] = useState(0);
    const { optionTitleId, optionTitleName, error } = useOptionTitle(adminId, menuId);
    const { menus, error: menusError, uniqueMenuCategoryNames } = useGetMenus(adminId, categoryId);
    const { options, error: optionsError } = useGetOption(adminId, menuId);
    const [ recommend, setRecommend ] = useState(false);
    const { menuName, menuPrice, setMenuName, setMenuPrice, insertMenu } = useInsertMenu(categories, adminId, recommend);
    const { categoryName, handleCategoryName, categoryInsert } = useCategoryInsert(adminId);
    const { insertOptionTitle, Optionerror } = useInsertOptionTitle();
    const [menuModal, setMenuModal] = useState(0);
    const [optionModal, setOptionModal] = useState(0);
    const [optionTitle, setOptionTitle] = useState("");
    const [optionName, setOptionName] = useState();
    const [optionPrice, setOptionPrice] = useState();
    const [optionSelectTitleId, setOptionSlectTitleId] = useState();

    const menu = {
        categoryName: uniqueMenuCategoryNames,
        menuName: menus
    };

    const handleCategoryId = (category) => {
        setCategoryId(category);
    };

    const handleMenuId = (menu) => {
        setMenuId(menu);
    };

    const menuInsertModal = () => {
        setMenuModal(1);
    };

    const handleRecommendChange = (e) => {
        setRecommend(e.target.checked);
    };

    const handleOptionTitleName = (e) => {
        setOptionTitle(e.target.value);
    };
    const optionsData = optionTitleId.map((id, index) => ({
        optionTitleId: id,
        titleNames: optionTitleName[index]
    }));

    const handleOptionName = (e) => {
        setOptionName(e.target.value)
    }

    const handleOptionPrice = (e) => {
        setOptionPrice(e.target.value)
    }

    const insertOption = async () => {
        try {
            const params = {
                adminId: adminId,
                menuId: menuId,
                titleId: optionSelectTitleId,
                optionName: optionName,
                optionPrice: optionPrice
            };
            console.log(params)
            await registerOption(params);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
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
            <div css={s.layout}>
                <div css={s.categoryLayout}>
                    <div>
                        <button onClick={categoryInsert}>카테고리 추가</button>   
                    </div>
                    <div>
                        <input onChange={handleCategoryName} type="text"/>
                    </div>
                    {categoriesError && <div>에러가 발생했습니다: {categoriesError.message}</div>}
                    <h3 onClick={() => handleCategoryId(0)}>전체</h3>
                    {categories.map(cat => (
                        <div onClick={() => handleCategoryId(cat.menuCategoryId)} key={cat.menuCategoryId}>{cat.menuCategoryName}</div>
                    ))}
                </div>
                <div css={s.menuLayout}>
                    <div>
                        <button onClick={menuInsertModal}>메뉴 추가</button>   
                    </div>
                    
                    {menu.categoryName?.map(category => (
                        <div key={category}>
                            <h3>{category}</h3>
                            {menu.menuName
                                .filter(menuItem => menuItem.menuCategoryName === category)
                                .map(menuItem => (
                                    <div onClick={() => handleMenuId(menuItem.menuId)} key={menuItem.menuCode} style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                        <span>{menuItem.menuName}</span>
                                        <span css={s.price}>가격: {menuItem.menuPrice}</span>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
                <div css={s.optionLayout}>
                    <div>
                        <button onClick={() => setOptionModal(1)}>옵션 추가</button>   
                    </div>
                    {
                        optionModal !== 0 &&
                        <OptionRegisterModal
                            optionModal={optionModal}
                            handleOptionTitleName={handleOptionTitleName}
                            insertOptionTitle={insertOptionTitle}
                            optionsData={optionsData}
                            setOptionSlectTitleId={setOptionSlectTitleId}
                            handleOptionName={handleOptionName}
                            handleOptionPrice={handleOptionPrice}
                            insertOption={insertOption}
                            closeModal={() => setOptionModal(0)}
                        />
                    }
                    <div>
                        {optionsError && <div>에러가 발생했습니다: {optionsError.message}</div>}
                        {options?.map((optionItem, index) => (
                            <div key={index}>
                                <h3>{optionItem.titleName}</h3>
                                <div>
                                    {optionItem.optionNames.map((name, idx) => (
                                        <div key={idx}>
                                            {name} + {optionItem.optionPrices[idx]}원
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>     
            </div>
        </div>
    );
}

export default MenuManagementPage;
