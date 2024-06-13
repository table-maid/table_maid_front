import { useState } from 'react';
import { registerOptionTitle } from '../apis/api/menuManagentApi';

const useInsertOptionTitle = () => {
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const insertOptionTitle = async (adminId, menuId, optionTitle) => {
        const param = { adminId, menuId, titleName: optionTitle };
        try {
            await registerOptionTitle(param);
            alert("추가가 완료되었습니다.");
            if(refresh === false) {
                setRefresh(true);
            } else {
                setRefresh(false)
            }
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    return { insertOptionTitle, error, refresh};
};

export default useInsertOptionTitle;
