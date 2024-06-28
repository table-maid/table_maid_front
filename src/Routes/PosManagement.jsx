import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PosMainPage from '../pages/PosManagementPages/PosMainPage/PosMainPage';
import PosTableDetailPage from '../pages/PosManagementPages/PosTableDetailPage/PosTableDetailPage';

function PosManagement(props) {
    return (
        <Routes>
            <Route path="/main" element={<PosMainPage/>} />
            <Route path="/setting" element={null} />
            <Route path="/table/detail/:tableId" element={<PosTableDetailPage />} />
        </Routes>
    );
}

export default PosManagement;
