import { useState } from 'react';
import { registerOptionTitle } from '../apis/api/menuManagentApi';

const useInsertOptionTitle = () => {
    const [error, setError] = useState(null);

    const insertOptionTitle = async (adminId, menuId, optionTitle) => {
        const param = { adminId, menuId, titleName: optionTitle };
        try {
            await registerOptionTitle(param);
            alert("추가가 완료되었습니다.");
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    return { insertOptionTitle, error };
};

export default useInsertOptionTitle;
