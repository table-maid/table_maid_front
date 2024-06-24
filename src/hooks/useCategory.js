import { useState, useEffect } from 'react';
import { searchCategoryRequest } from '../apis/api/menuManagentApi';

const useCategory = (adminId, categoryPageNum) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                console.log(categoryPageNum)
                const params = { adminId, categoryPageNum };
                const response = await searchCategoryRequest(params);
                setCategories(response.data);
            } catch (error) {
                console.log("에러", error);
                setError(error);
            }
        };

        getCategories();
    }, [adminId, categoryPageNum]);

    return { categories, error };
};

export default useCategory;
