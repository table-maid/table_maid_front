import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminRoute from "./Routes/AdminRoute";
import MenuRoute from "./Routes/MenuRoute";
import UserRoute from "./Routes/UserRoute";
import BackgroundLayout from "./components/BackgroundLayout/BackgroundLayout";
import AdminRootLayout from "./components/RootLayout/AdminRootLayout/AdminRootLayout";
import UserRootLayout from "./components/RootLayout/UserRootLayout/UserRootLayout";
import AdminRootContainer from "./components/RooutContainer/AdminRootContainer/AdminRootContainer";
import UserRootContainer from "./components/RooutContainer/UserRootContainer/UserRootContainer";

function App() {
  return (
      <BackgroundLayout>
        <Routes>
          {/* Admin 관련 경로 */}
          <Route
            path="/admin/*"
            element={
              <AdminRootLayout>
                <AdminRootContainer>
                  <AdminRoute />
                  <MenuRoute />
                </AdminRootContainer>
              </AdminRootLayout>
            }
          />

          {/* User 관련 경로 */}
          <Route
            path="/user/*"
            element={
              <UserRootLayout>
                <UserRootContainer>
                  <UserRoute />
                </UserRootContainer>
              </UserRootLayout>
            }
          />
        </Routes>
      </BackgroundLayout>
  );
}

export default App;
