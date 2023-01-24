import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useEffect } from "react";
import { actionTypes } from "./Reducer";
import { useStateValue } from "./StateProvider"

function App() {

  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    // Realizar una llamada al endpoint de login para verificar el estado de autenticación del usuario
    const checkAuthStatus = async () => {
    try {
    const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') })
    });
    const data = await response.json();
    if (data.user) {
    dispatch({
    type: actionTypes.SET_USER,
    user: data.user
    });
    } else {
    dispatch({
    type: actionTypes.SET_USER,
    user: null
    });
    }
    } catch (err) {
    console.error(err);
    }
    };
    checkAuthStatus();
    
    }, []);

  return (

    <Router >
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/checkoutPage" element={<CheckoutPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>

          <Footer />
        </header>
      </div>
    </Router>
  );

}

export default App;

