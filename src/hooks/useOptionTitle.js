import { useState, useEffect } from 'react';
import { searchOptionTitleRequest } from '../apis/api/menuManagentApi';

const useOptionTitle = (adminId, menuId, refresh) => {
    const [optionTitleId, setOptionTitleId] = useState([]);
    const [optionTitleName, setOptionTitleName] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchOptionTitle = async () => {
            try {
                
                const param = { adminId, menuId };
                const response = await searchOptionTitleRequest(param);
                setOptionTitleId(response.data.optionTitlesId);
                setOptionTitleName(response.data.optionTitleNames);
            } catch (error) {
                setError(error);
            }
        };

        if (menuId !== 0) {
            fetchOptionTitle();
        }

        
    }, [adminId, menuId, refresh]);

    return { optionTitleId, optionTitleName, error };
};

export default useOptionTitle;
