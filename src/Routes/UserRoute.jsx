import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuDetails from "../pages/UserPage/MenuDetailsPage/MenuDetails";
import UserMainPage from "../pages/UserPage/UserMainPage/UserMainPage";
import ShoppingBasketPage from "../pages/UserPage/ShoppingBasketPage/ShoppingBasketPage";
import EmployeeCallPage from "../pages/UserPage/EmployeeCallPage/EmployeeCallPage";

function UserRoute() {


  return (
    <>
      <Routes>
        <Route path="/user/main/:companyNumber/:tableNumber" element={<UserMainPage />} />
        <Route path="/user/details" element={<MenuDetails />} />
        <Route path="/user/shopping" element={<ShoppingBasketPage />} />
          <Route path="/user/shopping" element={<ShoppingBasketPage />} />
                <Route path="/user/call" element={<EmployeeCallPage />} />
      </Routes>
    </>
  );
}

export default UserRoute;
