import React from 'react'
import TermsAndConditions from './TermsAndConditions/TermsAndConditions'
import AdminInfo from './AdminInfo/AdminInfo'
import { Route, Routes } from 'react-router-dom'
import StoreInfo from './StoreInfo/StoreInfo'

function SignupPage() {
    return (
        <>
            <Routes>
                <Route path='/TAC' element={<TermsAndConditions/>} />
                <Route path='/adminInfo' element={<AdminInfo/>} />
                <Route path='/storeInfo' element={<StoreInfo/>} />
            </Routes>
        </>
    )
}

export default SignupPage

