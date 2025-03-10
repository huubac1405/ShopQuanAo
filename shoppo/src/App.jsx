import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getDetailsUser } from "./services/UserService";
import { updateUser } from "./redux/userSlice";
import { useSelector } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  const user = useSelector((state)=>state.user)
  console.log('user',user);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          getDetailsUser(decoded.id, token).then((res) => {
            dispatch(updateUser({ ...res?.data, access_token: token }));
          });
        }
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [dispatch]);


  console.log("API URL:", import.meta.env.VITE_API_URL);
  const fetchApi = async() => {
    const res= await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`)
    return res.data
  }
  const query = useQuery({queryKey:['todos'], queryFn: fetchApi})
  console.log('query',query);
  
  return (
    <div>
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          const Layout = route.isShowHeader ? DefaultComponent : Fragment
          return(
            <Route key={route.path} path={route.path} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
          )
        }
        )
        }
      </Routes>
    </Router>
    </div>
  );
}


export default App








