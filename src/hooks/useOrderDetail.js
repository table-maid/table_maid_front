import { useEffect, useState } from "react";
import { searchOrderDetail } from "../apis/api/order";
import { useParams } from "react-router-dom";

const useOrderDetail = (adminId, orderNumber) => {
    const [orderDetail, setOrderDetail] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            const param = {adminId, orderNumber}
            try {
                const response = await searchOrderDetail(param);
                setOrderDetail(response.data[0]);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchOrderDetail();
    }, []);  
    return {orderDetail, error};
};

export default useOrderDetail;