import {Switch, Route, Redirect} from "react-router-dom"
import Intro from "./component/Content/Intro";
import Main from "./component/Content/Main/Main";
import Register from "./component/Content/Registration/Register";
import Login from "./component/Content/Registration/Login";


export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return <Switch>
            <Route path = "/main">
                <Main/>
            </Route>
            <Redirect to="/main"/>
        </Switch>
    } else {
        return <Switch>
            <Route exact path = "/">
                <Intro/>
            </Route>
            <Route path = "/register">
                <Register/>
            </Route>
            <Route path = "/login">
                <Login/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    }
}