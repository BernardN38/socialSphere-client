import {Routes, Route, BrowserRouter} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login"
import Account from "./pages/Account/Account";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login/>}/>
          <Route path="users/:userId" element={<Profile />} />
          <Route path="login" element={<Login/>}/>
          <Route path="account" element={<Account/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
