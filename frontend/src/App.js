import './App.css';
import Header from "./component/Header/Header";
import Content from "./component/Content/Content";
import {BrowserRouter as Router} from "react-router-dom"
import {useAuth} from "./hooks/authHook";
import {AuthContext} from "./context/AuthContext";


function App() {
    const {token, userID,username, login, logout} = useAuth()
    const isAuthenticated = !token
    return (
        <AuthContext.Provider value={{token, userID,username, login, logout, isAuthenticated}}>
            <Router>
                <div className="wrapper">
                    <Header/>
                    <Content/>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
