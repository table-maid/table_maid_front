import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MenuManagementPage from '../pages/MenuPages/MenuManagementPage/MenuManagementPage'
import MenuListPage from '../pages/MenuPages/MenuListPage/MenuListPage'
import MenuManagementDetailPage from '../pages/MenuPages/MenuManagementDetailPage/MenuManagementDetailPage'

function MenuRoute() {
    return (
        <Routes>
            <Route path="/menu/view" element={<MenuManagementPage />} />
            <Route path="/menu/management/list" element={<MenuListPage />} />
            <Route path="/menu/management/detail/:menuId" element={<MenuManagementDetailPage />} />
        </Routes>
    )
}

export default MenuRoute