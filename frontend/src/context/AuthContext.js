import {createContext} from "react";

const noop = ()=>{}

export const AuthContext = createContext({
    token: null,
    userID: null,
    username: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})