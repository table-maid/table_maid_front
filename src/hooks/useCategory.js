import { useState, useEffect } from 'react';
import { searchCategoryRequest } from '../apis/api/menuManagentApi';

const useCategory = (adminId) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const params = { adminId };
                const response = await searchCategoryRequest(params);
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("에러", error);
                setError(error);
            }
        };

        getCategories();
    }, [adminId]);

    return { categories, error };
};

export default useCategory;
