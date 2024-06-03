/** @jsxImportSource @emotion/react */
import { searchCategoryRequest, searchMenuRequest, searchOptionRequest } from "../../../apis/api/menuManagentApi";
import * as s from "./style";

import React, { useEffect, useState } from 'react';

function MenuManagementPage(props) {
    const [category, setCategory] = useState([]);
    const [menu, setMenu] = useState([]);
    const [adminId, setAdminId] = useState(1);
    const [option, setOption] = useState();

    useEffect(() => {
        getCategories();
        getMenus();
        getOptions();
    }, [])

    const getCategories = async() => {
        try {
            const params = {
                adminId: 1
            }
            const response = await searchCategoryRequest(params)
            setCategory(response.data)
            console.log(response.data)
        } catch (error) {
            console.log("에러", error);
        }
    } 

    const getMenus = async() => {
        try {
            const params = {
                adminId: 1,
                menuCategoryId: 1
            }
            const response = await searchMenuRequest(params)
            setMenu(response.data)
            console.log(response.data)

        } catch (error) {
            console.log("에러", error);
            
        }
    }
    const getOptions = async() => {
        try {
            const params = {
                adminId: 1,
                optionMenuId: 2
            }
            const response = await searchOptionRequest(params)
            setOption(response.data)
            console.log(response.data)

        } catch (error) {
            console.log("에러", error);
            
        }
    }



    return (
        <div>
            {category.map(cat => (
                <div key={cat.menuCategoryId}>{cat.menuCategoryName}</div>
            ))}
            {menu.map(menu => (
                <div>
                    <div key={menu.menucategoryId}>{menu.menuName}</div>
                    <div key={menu.menucategoryId}>{menu.menuPrice}</div>
                    <div key={menu.menucategoryId}>{menu.menuCode}</div>
                </div>
            ))}
            {option?.map(option => (
                <div>
                    <div key={option.menuId}>{option.titleName}</div>
                    <div key={option.menuId}>{option.optionNames.map(name =><div>{name}</div>)}</div>
                </div>
            ))}
            <button>asdsad</button>
        </div>
    );
}

export default MenuManagementPage;