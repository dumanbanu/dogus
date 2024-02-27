
import './App.css';
import Login from './pages/login/Index';
import Register from './pages/register/Index';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"
import ProtectedRoute from './utils/authService/ProtectedRoute';
import Home from './pages/home/Index';
import Header from './components/header';



function App(): JSX.Element {

    return (
        <>

            <Router>
                <Header />
                <Routes>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path={'home'} element={<Home />} />
                    </Route>


                </Routes>
            </Router>
        </>
    );
}

export default App;
