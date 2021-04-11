import LogOutBar from "./LogOutBar";
import LogInBar from "./LogInBar";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";


export const  LogInOut = () =>{
    const auth = useContext(AuthContext)
    if(auth.isAuthenticated){
        return(
            <LogInBar/>
        )
    }else return <LogOutBar/>
}

