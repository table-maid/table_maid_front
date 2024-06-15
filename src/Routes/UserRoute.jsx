import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuDetails from "../pages/UserPage/MenuDetailsPage/MenuDetails";
import UserMainPage from "../pages/UserPage/UserMainPage/UserMainPage";
import ShoppingBasketPage from "../pages/UserPage/ShoppingBasketPage/ShoppingBasketPage";

function UserRoute() {
    return (
        <>
            <Routes>
                <Route path="/*" element={<UserMainPage />} />
                <Route path="/user/details" element={<MenuDetails />} />
                <Route path="/user/shopping" element={<ShoppingBasketPage />} />
            </Routes>
        </>
    );
}

export default UserRoute;
