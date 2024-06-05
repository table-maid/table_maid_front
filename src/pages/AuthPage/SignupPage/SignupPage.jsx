import React from 'react'
import TermsAndConditions from './TACPage/TACPage'
import AdminInfo from './AdminInfoPage/AdminInfoPage'
import { Route, Routes } from 'react-router-dom'

function SignupPage() {
    return (
        <>
            <Routes>
                <Route path='/TAC' element={<TermsAndConditions/>} />
                <Route path='/adminInfo' element={<AdminInfo/>} />
            </Routes>
        </>
    )
}

export default SignupPage

