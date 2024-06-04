import React from "react";
import MenuSelect from "../components/User/MenuSelect/MenuSelect";
import { Route, Routes } from "react-router-dom";
import MenuDetails from "../components/User/MenuDetails/MenuDetails";

function UserRoute() {
    return (
        <>
            <Routes>
                <Route path="/user/menu" element={<MenuSelect />} />
                <Route path="/user/details" element={<MenuDetails />} />
            </Routes>
        </>
    );
}

export default UserRoute;
