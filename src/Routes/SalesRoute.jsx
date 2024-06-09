import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSalesPage from "../pages/SalesPage/AdminSalesPage/AdminSalesPage";
import MenuListPage from "../pages/SalesPage/MenuListPage/MenuListPage";

function SalesRoute(props) {
    return (
        <Routes>
            <Route path="/sale" element={<AdminSalesPage />} />
            <Route path="/menu" element={<MenuListPage />} />
        </Routes>
    );
}

export default SalesRoute;
