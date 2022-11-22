import {Routes, Route, BrowserRouter} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="login" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
