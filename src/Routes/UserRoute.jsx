import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuDetails from "../pages/UserPage/MenuDetailsPage/MenuDetails";
import UserMainPage from "../pages/UserPage/UserMainPage/UserMainPage";

function UserRoute() {
    return (
        <>
            <Routes>
                <Route path="/*" element={<UserMainPage />} />
                <Route path="/user/details/:menuId" element={<MenuDetails />} />
            </Routes>
        </>
    );
}

export default UserRoute;
