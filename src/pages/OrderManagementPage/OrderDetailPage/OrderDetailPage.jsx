/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import useOrderDetail from "../../../hooks/useOrderDetail";
import * as s from "./style";
import { useEffect, useState } from "react";
import { addRefundDetail } from "../../../apis/api/order";

function OrderDetailPage(props) {
    const adminId = 1;
    const { orderNumber } = useParams();
    const { orderDetail, error: orderDetailError } = useOrderDetail(adminId, orderNumber);
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (orderDetail?.menu) {
            const total = orderDetail.menu.reduce((sum, item) => sum + item.menuTotalPrice, 0);
            setOrderTotalPrice(total);
        }
    }, [orderDetail]);

    const registerRefundDetail = async () => {
        try {
            if (window.confirm("환불처리 하시겠습니까?")) {
                await addRefundDetail(orderDetail);
                window.alert("환불처리가 완료되었습니다.");
                navigate("/admin/order/list");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.tableSection}>
                    <div css={s.tableHeader}>
                        <div>홀 {orderDetail?.tableNumber}번 테이블</div>
                        <div css={s.tableNumber}>주문번호 {orderDetail?.orderNumber}</div>
                    </div>
                    <div css={s.tableLayout}>
                        <table css={s.table}>
                            <thead>
                                <tr>
                                    <th>메뉴</th>
                                    <th>수량</th>
                                    <th>옵션</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail?.menu.map((m, index) => (
                                    <tr key={index}>
                                        <td>{m.menuName}</td>
                                        <td>{m.menuCount}</td>
                                        <td>
                                            {m.options && m.options.length > 0
                                                ? m.options.map(option => `${option.optionName} (+${option.optionPrice}원)`).join(", ")
                                                : ""}
                                        </td>
                                        <td>{m.menuTotalPrice}원</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div css={s.totalSection}>
                        <div css={s.totalPrice}>
                            <div>총 금액</div>
                            <div>{orderTotalPrice}원</div>
                        </div>
                        <div css={s.paymentLayout}>
                            <button css={s.paymentButton} onClick={registerRefundDetail}>환불</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailPage;
