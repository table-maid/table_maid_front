import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import SalesRoute from './SalesRoute';
import AdminMainPage from '../pages/AdminPage/AdminMainPage/AdminMainPage';
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage';
import PosManagement from './PosManagement';
import OrderRoute from './OrderRoute';

function AdminRoute(props) {
    const principalQuery = useQuery("principalQuery", getPrincipalRequest, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            console.log("프린스퍼");
            console.log(response.data);
        },
        onError: (error) => {
          console.log(error);
        },
      });

    return (
        <>
            <Routes>
                <Route path="/auth/*" element={<AuthRoute/>}/>
                <Route path="/menu/*" element={null}/>
                <Route path="/sales/*" element={<SalesRoute/>}/>
                <Route path="/main" element={<AdminMainPage />}/>
                <Route path='/account/edit/password' element={<PasswordEditPage/>}/>

                <Route path='/pos/*' element={<PosManagement/>}/>
                <Route path='/order/*' element={<OrderRoute />}/>
                {/* <Route path="" element={null}/>
                <Route path="" element={null}/>
                <Route path="" element={null}/> */}
            </Routes>
        </>
    );
}

export default AdminRoute;