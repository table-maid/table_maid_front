/** @jsxImportSource @emotion/react */
import useCategory from "../../../hooks/useCategory";
import useGetMenus from "../../../hooks/useGetMenu";
import useGetOption from "../../../hooks/useGetOption";
import * as s from "./style";
import React, { useState } from 'react';

function MenuManagementPage(props) {
    const [adminId, setAdminId] = useState(1);
    const { categories, error: categoriesError } = useCategory(adminId);
    const [ categoryId, setCategoryId ] = useState(0);
    const { menus, error: menusError, uniqueMenuCategoryNames } = useGetMenus(adminId, categoryId);
    const { options, error: optionsError } = useGetOption(adminId, 2);

    const menu = {
        categoryName: uniqueMenuCategoryNames,
        menuName:menus
    }

    const handleCategoryId = (category) => {
        setCategoryId(category)
    }

    return (
        <div css={s.layout}>
            <div css={s.categoryLayout}>
                {categoriesError && <div>에러가 발생했습니다: {categoriesError.message}</div>}
                    <h3 onClick={() => handleCategoryId(0)} >전체</h3>
                {categories.map(cat => (
                    <div onClick={() => handleCategoryId(cat.menuCategoryId)} key={cat.menuCategoryId}>{cat.menuCategoryName}</div>
                ))}
                </div>
                <div css={s.menuLayout}>
                    {menu.categoryName?.map(category => (
                        <div key={category}>
                            <h3>{category}</h3>
                            {menu.menuName
                                .filter(menuItem => menuItem.menuCategoryName === category)
                                .map(menuItem => (
                                    <div key={menuItem.menuCode} style={{display: "flex", width: "100%", justifyContent:"space-between"}}>
                                        <span>{menuItem.menuName}</span>
                                        <span css={s.price}>가격: {menuItem.menuPrice}</span>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            <div css={s.optionLayout}>
                {optionsError && <div>에러가 발생했습니다: {optionsError.message}</div>}
                {options?.map(optionItem => (
                    <div key={optionItem.menuId}>
                        <div>{optionItem.titleName}</div>
                        <div>{optionItem.optionNames.map((name, index) => <div key={index}>{name}</div>)}</div>
                    </div>
                ))}
            </div>            
        </div>
    );
}

export default MenuManagementPage;
