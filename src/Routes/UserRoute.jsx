import React from "react";
import { Route, Routes } from "react-router-dom";
import UserMainPage from "../pages/UserPage/UserMainPage/UserMainPage";
import MenuDetails from "../pages/UserPage/MenuDetailsPage/MenuDetails";
import ShoppingBasketPage from "../pages/UserPage/ShoppingBasketPage/ShoppingBasketPage";
import EmployeeCallPage from "../pages/UserPage/EmployeeCallPage/EmployeeCallPage";

function UserRoute() {
  return (
    <Routes>
      <Route path="/main/:companyNumber/:tableNumber" element={<UserMainPage />} />
      <Route path="/details" element={<MenuDetails />} />
      <Route path="/shopping" element={<ShoppingBasketPage />} />
      <Route path="/call" element={<EmployeeCallPage />} />
    </Routes>
  );
}

export default UserRoute;
