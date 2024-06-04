import { useState, useEffect } from 'react';
import { searchOptionRequest } from '../apis/api/menuManagentApi';

const useGetOption = (adminId, optionMenuId) => {
    const [options, setOptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOptions = async () => {
            try {
                const params = { adminId, optionMenuId };
                const response = await searchOptionRequest(params);
                setOptions(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("에러", error);
                setError(error);
            }
        };

        getOptions();
    }, [adminId, optionMenuId]);

    return { options, error };
};

export default useGetOption;
