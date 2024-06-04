import { useState, useEffect } from 'react';
import { searchMenuRequest } from '../apis/api/menuManagentApi';

const useGetMenus = (adminId, menuCategoryId) => {
    const [menus, setMenus] = useState([]);
    const [uniqueMenuCategoryNames, setUniqueMenuCategoryNames] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMenus = async () => {
            try {
                const params = { adminId, menuCategoryId };
                const response = await searchMenuRequest(params);
                setUniqueMenuCategoryNames([...new Set(response.data.map(menu => menu.menuCategoryName))]);
                setMenus(response.data);
                console.log(response.data);
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