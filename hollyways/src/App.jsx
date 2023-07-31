import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/Homepage'
import NavbarComponent from './components/NavbarComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import { API, setAuthToken } from './config/api'
import Profile from './pages/Profile'
import MyRaiseFund from './pages/MyRaiseFund'
import AddFundraising from './pages/AddFundraising'
import { PrivateRouteLogin } from './components/privateRoute'
import RaiseFund from './pages/RaiseFund'


function App() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(null)
  const [state, dispatch] = useContext(UserContext)

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      dispatch({
        type: "LOGOUT",
      });
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (state.isLogin === false) {
      navigate("/")
    }
  }, [isLoading])

  return (
    <div>
      {isLoading ? null : (
        <>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route element={<PrivateRouteLogin />} >
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
            <Route element={<PrivateRouteLogin />} >
              <Route path="/myRaiseFund/:id" element={<MyRaiseFund />} />
            </Route>
            <Route element={<PrivateRouteLogin />} >
              <Route path="/makeRaiseFund" element={<AddFundraising />} />
            </Route>
            <Route element={<PrivateRouteLogin />} >
              <Route path="/raiseFund/:id" element={<RaiseFund />} />
            </Route>

          </Routes>
        </>
      )}
    </div>
  )
}

export default App
