
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import PrivateRoute from './helper/routes/PrivateRoute';
import AuthProvider from './store/AuthContext';
import Login from './pages/Login';
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>         
         
          <Route path="/" element={<Login />} />                 
   
           <Route path="/login" element={<Login />} />
        
           <Route path="/signup" element={<Signup />} />

        
        <Route
            path="/post"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />

         <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
         

        </Routes>
      </BrowserRouter>
 
    </AuthProvider>
  );
}


