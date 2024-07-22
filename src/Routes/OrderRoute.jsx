import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderListPage from '../pages/OrderManagementPage/OrderListPage/OrderListPage';
import OrderDetailPage from '../pages/OrderManagementPage/OrderDetailPage/OrderDetailPage';

function OrderRoute(props) {
    return (
        <Routes>
            <Route path="/list" element={<OrderListPage />} />
            <Route path="/detail/:orderNumber" element={<OrderDetailPage/>} />
        </Routes>
    );
}

export default OrderRoute;