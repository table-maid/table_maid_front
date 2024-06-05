import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSalesPage from "../pages/SalesPage/AdminSalesPage/AdminSalesPage";

function SalesRoute(props) {
    return (
        <Routes>
            <Route path="/sale" element={<AdminSalesPage />} />
        </Routes>
    );
}

export default SalesRoute;
