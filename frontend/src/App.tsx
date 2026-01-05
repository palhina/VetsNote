import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import { Home } from "./components/Home";
import { LoginUser } from "./components/LoginUser";
import { CreateUser } from "./components/CreateUser";

function App() {
  return (
    <>
      <nav>
        <Link to="/users/login">ログイン</Link> |
        <Link to="/users/create">新規ユーザー登録</Link>
      </nav>
      <Routes>
        <Route path="/users/login" element={<LoginUser />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
