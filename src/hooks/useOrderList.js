import { useEffect, useState } from "react";
import { searchOrderList } from "../apis/api/order";

const useOrderList = (adminId) => {
    const [orderList, setOrderList] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderList = async () => {
            const param = {adminId}
            try {
                const response = await searchOrderList(param);
                setOrderList(response.data);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchOrderList();
    }, []);  
    return {orderList, error};
};

export default useOrderList;