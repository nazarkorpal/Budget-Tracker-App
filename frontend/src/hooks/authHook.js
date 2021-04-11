import {useState, useEffect, useCallback} from "react"

const storageName = "userD"

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)
    const [username, setUsername] = useState(null)

    const login = useCallback((jwtToken, id, username)=>{
        setToken(jwtToken)
        setUserID(id)
        setUsername(username)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userID: id, username: username}))
    }, [])
    const logout = useCallback(()=>{
        setToken(null)
        setUserID(null)
        setUsername(null)
        localStorage.removeItem(storageName)
    }, [])
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userID, data.username)
        }
    }, [login])

    return {token, userID,username, login, logout}

}

