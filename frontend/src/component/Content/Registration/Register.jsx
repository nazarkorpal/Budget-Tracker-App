import styles from "./RegLog.module.css"
import {useState} from "react";
import axios from "axios";


function Register(props) {
    const [form, setForm] = useState({email: "", username: "", password: ""})
    const updateForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const reg = async () => {

        const body = JSON.stringify(form)
        axios.post("/api/auth/register", body, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                if (res.data.status === "201") {
                    window.M.toast({html: res.data.message, classes: "rounded"})
                    setForm({username: "", email: "", password: ""})
                    setTimeout(() => {
                        window.location.assign('/login')
                    }, 1500)
                } else if(res.data.status === "errors"){
                    for (let key of res.data.errors.errors){
                        window.M.toast({html: key.msg, classes: "rounded"})
                    }
                }
                 else {
                    window.M.toast({html: res.data.message, classes: "rounded"})
                    throw new Error(res.data.status)
                }
            }).catch(err => {
            console.log(err)
        })

    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <div>
                    <label htmlFor="email"><b>Username</b></label>
                    <input type="text" value={form.username} placeholder="Enter Username" name="username" id="username"
                           required
                           onChange={updateForm}/>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" value={form.email} placeholder="Enter Email" name="email" id="email" required
                           onChange={updateForm}/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" value={form.password} placeholder="Enter Password" name="password"
                           id="password" required
                           onChange={updateForm}/>

                    <div>
                        <button type="submit" onClick={reg} className={styles.registerbtn}>Register</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Register