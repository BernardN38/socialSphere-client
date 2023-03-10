import {Routes, Route, BrowserRouter} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Friends from "./pages/Friends/Friends";
import Messages from "./pages/Messages/Messages";
import Inbox from "./pages/Inbox/Inbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login/>}/>
          <Route path="users/:userId" element={<Profile />} />
          <Route path="chat/:userId" element={<Messages/>}/>
          <Route path="inbox" element={<Inbox/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="account" element={<Account/>}/>
          <Route path="friends" element={<Friends/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
