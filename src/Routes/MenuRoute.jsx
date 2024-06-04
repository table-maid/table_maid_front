import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MenuManagementPage from '../pages/MenuPages/MenuManagementPage/MenuManagementPage'

function MenuRoute() {
    return (
        <Routes>
            <Route path="/menu/view" element={<MenuManagementPage />} />
        </Routes>
    )
}

export default MenuRoute