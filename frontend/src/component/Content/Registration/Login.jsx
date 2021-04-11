import styles from "./RegLog.module.css";
import React, {useContext, useState} from "react"
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {useAuth} from "../../../hooks/authHook";




function Login(props) {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({email: "", password: ""})
    const updateForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const log = async () => {
        setForm({...form, password: ""})
        const body = JSON.stringify(form)
        axios.post("/api/auth/login", body, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                if(res.data.status === "201"){
                    auth.login(res.data.token, res.data.userID, res.data.username)
                    setTimeout(()=>{
                        window.location.reload(false)
                    },100)
                }
                else {
                    window.M.toast({html: res.data.message, classes: "rounded"})
                    throw new Error(res.data.status)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <h1>Login</h1>
                <p>Please fill in this form to Log In.</p>
                <div>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" value = {form.email} placeholder="Enter Email" name="email" id="email" required
                           onChange={updateForm}/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" value={form.password} placeholder="Enter Password" name="password" id="password" required
                           onChange={updateForm}/>

                    <div>

                        <button type="submit" onClick={log} className={styles.loginbtn}>Log In</button>
                    </div>
                    <Link to="/register">
                        <button type="submit" className={styles.registerbtn}>Register</button>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default Login