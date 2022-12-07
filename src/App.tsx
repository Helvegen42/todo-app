import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Task from "./pages/Task";
import NewTodo from "./pages/NewTodo";

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/task/:task.id' element={<PrivateRoute />}>
              <Route path='/task/:task.id' element={<Task />} />
            </Route>
            <Route path='/new-todo' element={<PrivateRoute />}>
              <Route path='/new-todo' element={<NewTodo />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
