import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import SalesRoute from './SalesRoute';
import AdminMainPage from '../pages/AdminPage/AdminMainPage/AdminMainPage';

function AdminRoute(props) {
    const principalQuery = useQuery("principalQuery", getPrincipalRequest, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            console.log("프린스퍼");
            console.log(response);
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
                {/* <Route path="" element={null}/>
                <Route path="" element={null}/>
                <Route path="" element={null}/> */}
            </Routes>
        </>
    );
}

export default AdminRoute;