import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import SigninPage from '../pages/AuthPage/SigninPage/SigninPage'
import SignupPage from '../pages/AuthPage/SignupPage/SignupPage'
import SearchUserNamePage from '../pages/AuthPage/SearchUserNamePage/SearchUserNamePage'
import SearchPasswordPage from '../pages/AuthPage/SearchPasswordPage/SearchPasswordPage'
import TACPage from '../pages/AuthPage/SignupPage/TACPage/TACPage'



function AuthRoute() {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery")
    console.log(principalData);

    useEffect(() => {
        if(!!principalData) {
            alert("잘못된 접근입니다. (토큰이 있음)")
            window.location.replace("/admin/")
        }
    }, [principalData]);

    return (
        <>
            <Routes>
                <Route path='/signin' element={<SigninPage/>} />
                <Route path='/signup/*' element={<SignupPage/>} />
                <Route path="/agreement" element={<TACPage />} />
                <Route path='/search/username' element={<SearchUserNamePage/>}/>
                <Route path='/search/password' element={<SearchPasswordPage/>}/>
            </Routes>
        </>
    )
}

export default AuthRoute
