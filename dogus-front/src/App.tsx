
import './App.css';
import NoteTable from './components/note-table/Index';
import Login from './pages/login/Index';
import Register from './pages/register/Index';
import { getNotesUsingGet } from './services/api/noteControllerService';
import { setAuthUser, getAuthUser, deleteAuthUser } from './utils/authService/Index';
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
            <Header/>
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
