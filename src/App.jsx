import "./App.css";
import AdminRoute from "./Routes/AdminRoute";
import MenuRoute from "./Routes/MenuRoute";
import UserRoute from "./Routes/UserRoute";
import BackgroundLayout from "./components/BackgroundLayout/BackgroundLayout";
import RootHeader from "./components/RootHeader/RootHeader";
import AdminRootLayout from "./components/RootLayout/AdminRootLayout/AdminRootLayout";
import UserRootLayout from "./components/RootLayout/UserRootLayout/UserRootLayout";
import AdminRootContainer from "./components/RooutContainer/AdminRootContainer/AdminRootContainer";
import UserRootContainer from "./components/RooutContainer/UserRootContainer/UserRootContainer";

function App() {
  return (
    <>
      <BackgroundLayout>
    
        <AdminRootLayout>
         <AdminRootContainer>
         <AdminRoute />
         <MenuRoute />
         </AdminRootContainer>
        </AdminRootLayout>

        {/* <UserRootLayout>
          <UserRootContainer>
            <RootHeader />
            <UserRoute />
          </UserRootContainer>
        </UserRootLayout> */}

      </BackgroundLayout>
    </>
  );
}

export default App;
