import { useState, useEffect } from 'react';
import { searchMenuRequest, serachMenuList } from '../apis/api/menuManagentApi';

const useGetMenus = (adminId, menuCategoryId) => {
    const [menus, setMenus] = useState([]);
    const [uniqueMenuCategoryNames, setUniqueMenuCategoryNames] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMenus = async () => {
            try {
                const params = { adminId, menuCategoryId };
                console.log(params)
                const response = await serachMenuList(params);
                setUniqueMenuCategoryNames([...new Set(response.data.map(menu => menu.menuCategoryName))]);
                setMenus(response.data);
                
            } catch (error) {
                console.log("에러", error);
                setError(error);
            }
        };

        getMenus();
    }, [adminId, menuCategoryId]);

    return { menus, error, uniqueMenuCategoryNames};
};

export default useGetMenus;