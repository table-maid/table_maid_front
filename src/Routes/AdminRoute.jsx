import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import SalesRoute from './SalesRoute';


function AdminRoute(props) {

    return (
        <>
            <Routes>
                <Route path="/auth/*" element={<AuthRoute/>}/>
                <Route path="/menu/*" element={null}/>
                <Route path="/sales/*" element={<SalesRoute/>}/>
                {/* <Route path="" element={null}/>
                <Route path="" element={null}/>
                <Route path="" element={null}/> */}
            </Routes>
        </>
    );
}

export default AdminRoute;