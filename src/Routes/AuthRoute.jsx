import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import SigninPage from '../pages/AuthPage/SigninPage/SigninPage'
import SignupPage from '../pages/AuthPage/SignupPage/SignupPage'
import SearchUserName from '../pages/AuthPage/SearchUserName/SearchUserName'


function AuthRoute() {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery")

    useEffect(() => {
        if(!!principalData) {
            alert("잘못된 접근입니다. (토큰이 있음)")
            window.location.replace("/")
        }
    }, [principalData]);

    return (
        <>
            <Routes>
                <Route path='/signin' element={<SigninPage/>} />
                <Route path='/signup/*' element={<SignupPage/>} />
                <Route path='/search/username' element={<SearchUserName/>}/>
            </Routes>
        </>
    )
}

export default AuthRoute
