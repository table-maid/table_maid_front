import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSalesPage from "../pages/SalesPage/AdminSalesPage/AdminSalesPage";
import MenuSalesPage from "../pages/SalesPage/MenuSalesPage/MenuSalesPage";

function SalesRoute(props) {
    return (
        <Routes>
            <Route path="/sale" element={<AdminSalesPage />} />
            <Route path="/menu" element={<MenuSalesPage />} />
        </Routes>
    );
}

export default SalesRoute;
