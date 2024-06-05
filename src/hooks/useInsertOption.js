import { useState } from 'react';
import { registerOption } from '../apis/api/menuManagentApi';

const useInsertOption = () => {
    const [error, setError] = useState(null);

    const insertOption = async (adminId, menuId, titleId, optionName, optionPrice) => {
        try {
            const params = { adminId, menuId, titleId, optionName, optionPrice };
            console.log(params)
            await registerOption(params);
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    return { insertOption, error };
};

export default useInsertOption;
