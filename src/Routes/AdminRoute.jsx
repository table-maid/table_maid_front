import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';


function AdminRoute(props) {
   const principalQuery = useQuery("principalQuery", getPrincipalRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
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
                <Route path="/sales/*" element={null}/>
                {/* <Route path="" element={null}/>
                <Route path="" element={null}/>
                <Route path="" element={null}/> */}
            </Routes>
        </>
    );
}

export default AdminRoute;