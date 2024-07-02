/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOrderList from "../../../hooks/useOrderList";

function OrderListPage(props) {
    const navigate = useNavigate();
    const adminId = 1;
    const {orderList, error: orderError} = useOrderList(adminId);

    useEffect(() => {
        if (orderList) { 
            console.log(orderList);
        }
    }, [])  

    const formatMenuList = (menus) => {
        const fullMenuString = menus.map(menu => menu.menuName).join(", ");
        return fullMenuString.length > 10 ? fullMenuString.substring(0, 10) + '...' : fullMenuString;
    }

    return (
        <div css={s.tablelayout}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>테이블 번호</th>
                            <th>주문 번호</th>
                            <th>메뉴</th>
                            <th>총 가격</th>
                            <th>결제 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList?.map(order => 
                            <tr>
                                <td>{order.tableNumber}</td>
                                <td>{order.orderNumber}</td>
                                <td onClick={() => navigate(`/order/detail/${order.orderNumber}`)}>{formatMenuList(order.menu)}</td>
                                <td>{order.orderTotalPrice}</td>
                                <td>{order.paymentDate}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderListPage;