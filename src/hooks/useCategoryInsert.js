import { useState } from 'react';
import { registerCategory } from '../apis/api/menuManagentApi';

const useCategoryInsert = (adminId) => {
    const [categoryName, setCategoryName] = useState('');

    const handleCategoryName = (e) => {
        setCategoryName(e.target.value);
    };

    const categoryInsert = async () => {
        try {
            const params = {
                adminId: adminId,
                menuCategoryName: categoryName
            };
            const response = await registerCategory(params);
            alert("카테고리 추가가 완료되었습니다.");
            window.location.reload();
        } catch (error) {
            console.log("에러", error);
        }
    };

    return {
        categoryName,
        handleCategoryName,
        categoryInsert
    };
};

export default useCategoryInsert;
