import "./App.css";
import AdminRoute from "./Routes/AdminRoute";
import UserRoute from "./Routes/UserRoute";
import BackgroundLayout from "./components/BackgroundLayout/BackgroundLayout";
import AdminRootLayout from "./components/RootLayout/AdminRootLayout/AdminRootLayout";
import UserRootLayout from "./components/RootLayout/UserRootLayout/UserRootLayout";
import AdminRootContainer from "./components/RooutContainer/AdminRootContainer/AdminRootContainer";
import UserRootContainer from "./components/RooutContainer/UserRootContainer/UserRootContainer";

function App() {
  
  return (
    <>
      <BackgroundLayout>
        <AdminRootLayout>
          {/* <AdminRootContainer> */}
            <AdminRoute />
          {/* </AdminRootContainer> */}
        </AdminRootLayout>

        <UserRootLayout>
          <UserRootContainer>
            <UserRoute />
          </UserRootContainer>
        </UserRootLayout>
      </BackgroundLayout>
    </>
  );
}

export default App;
