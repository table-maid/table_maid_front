/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderList from "../../../hooks/useOrderList";
import SalesButtons from "../../../components/Sales/SalesButtons/SalesButtons";
import DateRangePicker from "../../../components/Sales/DatePicker/DateRangePicker";
import { viewTypeState } from "../../../atoms/ViewTypeStateAtom";
import { useRecoilState } from "recoil";
import { searchOrderList } from "../../../apis/api/order";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

const formatDateSimple = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`; // 'YYYY-MM-DD' 형식으로 문자열 반환
}

function OrderListPage(props) {
    const navigate = useNavigate();
    const adminId = 1;
    const [orderList, setOrderList] = useState();
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchClicked, setSearchClicked] = useState(false);
    const [activeButton, setActiveButton] = useState("all");
    const [viewType, setViewType] = useRecoilState(viewTypeState);
    const [startChangeDate, setStartChangeDate] = useState(0);
    const [endChangeDate, setEndChangeDate] = useState(0);

    const fetchOrderList = async (startDate, endDate) => {
        const param = {adminId, startDate, endDate}
        try {
            const response = await searchOrderList(param);
            setOrderList(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchOrderList();
    }, []);  

    useEffect(() => {
        handleStartDateChange(startDate)
        handleEndDateChange(endDate)
    }, [startDate, endDate])

    const handleStartDateChange = (date) => {  
        setStartChangeDate(formatDateSimple(date))
        console.log(startChangeDate);  
    };

    const handleEndDateChange = (date) => {  
        setEndChangeDate(formatDateSimple(date))
        console.log(endChangeDate);  
    };
    

    const handleViewTypeChange = (viewType) => {
        const today = new Date();
        const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

        setActiveButton(viewType);
        switch (viewType) {
            case "week":
                setStartDate(oneWeekAgo);
                setEndDate(new Date());
                break;
            case "month":
                setStartDate(firstDayLastMonth);
                setEndDate(lastDayLastMonth);
                break;
            case "all":
                setStartDate(new Date('2024-01-01'));
                setEndDate(new Date());
                break; 
        }
    };

    const formatMenuList = (menus) => {
        const fullMenuString = menus.map(menu => menu.menuName).join(", ");
        return fullMenuString.length > 10 ? fullMenuString.substring(0, 10) + '...' : fullMenuString;
    }
    const handleSearchClick = () => {
        setSearchClicked(true);
        setActiveButton("search");
        setViewType("custom");
        fetchOrderList(startChangeDate, endChangeDate);
      };

    const isDisabled = startDate > endDate;


    return (
        <div css={s.layout}>
            <div>
                <div css={s.salesLayout}>
                    <div
                    css={s.selectBox}
                    >
                    <SalesButtons
                        handleViewTypeChange={handleViewTypeChange}
                        activeButton={activeButton}
                    />
                    <DateRangePicker
                        startDate={startDate} 
                        setStartDate={setStartDate}  
                        endDate={endDate}  
                        setEndDate={setEndDate}
                        handleSearchClick={handleSearchClick}   
                        isDisabled={isDisabled} 
                        activeButton={activeButton} 
                    />
                    </div> 
                </div> 
                <div >
                    <div css={s.listLayout}> 
                        <table css={s.tableLayout}>
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
                                        <td onClick={() => navigate(`/admin/order/detail/${order.orderNumber}`)}>{formatMenuList(order.menu)}</td>
                                        <td>{order.orderTotalPrice}</td>
                                        <td>{formatDate(order.paymentDate)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OrderListPage;