import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSalesPage from "../pages/SalesPage/AdminSalesPage/AdminSalesPage";
import SalesMenuListPage from "../pages/SalesPage/SalesMenuListPage/SalesMenuListPage";
import SalesMenuPage from "../pages/SalesPage/SalesMenuPage/SalesMenuPage";
import DashboardPage from "../pages/SalesPage/DashboardPage/DashboardPage";

function SalesRoute(props) {
  return (
    <>
      <Routes>
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/sale" element={<AdminSalesPage />} />
        <Route path="/menu" element={<SalesMenuListPage />} />
        <Route path="/menu/detail/:menuId" element={<SalesMenuPage />} />
      </Routes>
    </>
  );
}

export default SalesRoute;
