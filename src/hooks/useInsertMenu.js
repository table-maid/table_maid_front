/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { registerMenu } from '../apis/api/menuManagentApi';

function useInsertMenu(categories, adminId, recommend) {
    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');

    const insertMenu = async (categoryId, categoryName) => {
        try {
            if (categoryId === 0) {
                alert("카테고리를 선택해주세요");
                throw new Error("카테고리를 선택해주세요.");
            }
            const params = {
                adminId: adminId,
                menuCategoryId: categoryId,
                menuCategoryName: categoryName,
                menuName: menuName,
                menuPrice: menuPrice,
                recommendMenu: recommend === true ? 1 : 0,
                menuState: 1
            };
            await registerMenu(params);
            alert("메뉴 추가가 완료되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return { menuName, menuPrice, setMenuName, setMenuPrice, insertMenu };
}

export default useInsertMenu;
