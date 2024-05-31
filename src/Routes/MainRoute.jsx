import React from 'react';
import { Route, Routes } from 'react-router-dom';

function MainRoute(props) {
    return (
        <>
            <Routes>
                <Route path="/auth/*" element={null}/>
                <Route path="/menu/*" element={null}/>
                <Route path="/sales/*" element={null}/>
                <Route path="" element={null}/>
                <Route path="" element={null}/>
                <Route path="" element={null}/>
            </Routes>
        </>
    );
}

export default MainRoute;