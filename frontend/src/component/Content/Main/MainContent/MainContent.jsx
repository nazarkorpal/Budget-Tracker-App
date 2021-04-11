import React, {useContext, useEffect, useState} from 'react';
import styles from "./MainContent.module.css"
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useDispatch, useSelector} from "react-redux";
import {createNote, deleteNote, loadNotes, patchNote} from "../../../../redux/actions/actionCreator";
import {AuthContext} from "../../../../context/AuthContext";
import M from "materialize-css/dist/js/materialize.min"



const MainContent = () => {
    const n = useSelector(state => state.NotesReducer)
    const {token, userID} = useContext(AuthContext)
    const dispatch = useDispatch()
    const [value, setValue] = useState(new Date())
    const [costs, setCosts] = useState({amount: "", category: ""})
    const [activeEdit, setActiveEdit] = useState(0)
    const [newCosts, setNewCosts] = useState({amount: "", category: ""})

    const costsHandler = (event) => {
        event.preventDefault()
        setCosts({...costs, [event.target.name]: event.target.value})
    }

    const newCostsHandler = (event) => {
        event.preventDefault()
        setNewCosts({...newCosts, [event.target.name]: event.target.value})
    }
    const info = {
        id: userID,
        year: value.getFullYear(),
        month: value.getMonth(),
        day: value.getDate(),
        costs: costs,
        token: token
    }
    useEffect(() => {
        dispatch(loadNotes(info))
    }, [dispatch, token])

    const createEntry = (e) => {
        e.preventDefault()
        if(costs.amount && costs.category) {
            dispatch(createNote(info))
            setCosts({amount: "", category: ""})
            setTimeout(()=>{
                window.location.reload(false)
            },1)
        }else {
            M.toast({html: "Fields must contain at least 1 character", classes: "rounded"})
        }
    }
    let total = 0;

    const deleteN = (e)=>{
        const info = e.target.value
        const data = {token, id: userID, noteID: info}
        dispatch(deleteNote(data))
    }

    const showEdit = (e)=>{
        if(!activeEdit){
            setActiveEdit(e.target.value)
        }
        else setActiveEdit(0)
    }

    const editB = (e)=>{
        if(newCosts.amount && newCosts.category){
            const info = e.target.value
            const data = {token, id: userID, noteID: info, costs: {amount: newCosts.amount, category: newCosts.category}}
            dispatch(patchNote(data))
            setNewCosts({amount: "", category: ""})
            setActiveEdit(0)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div>
            <div className={styles.forms}>
                <div>
                    <Calendar
                        onChange={setValue}
                        value={value}
                    />
                </div>
                <div className={styles.inputField}>
                    <input name="amount" value={costs.amount} type="number" onChange={costsHandler}
                           placeholder="Spent Amount ($)"/>
                    <input name="category" value={costs.category} type="text" onChange={costsHandler}
                           placeholder="Category"/>
                    <button onClick={createEntry}>Create Entry</button>
                </div>
            </div>
            </div>
            <div>
                <div className={styles.outputForm}>
                    <div className={styles.out_content}>
                        <h3>Day spendings:</h3>
                        <div>
                            {n.map((e) => {
                                if (e.year === value.getFullYear() && e.month === value.getMonth() && e.day === value.getDate()) {
                                    total = total + +e.costs.amount
                                    return <div key={e._id} className={styles.cos}>
                                        <div  className={styles.costs}>
                                        <div> {e.costs.category}</div>
                                        <div> {e.costs.amount}$</div>
                                        </div>
                                        <div className={styles.btns}>
                                            <button onClick={showEdit} value={e._id} >Edit</button>
                                            <button onClick={deleteN} value={e._id} >Delete</button>
                                        </div>
                                        <div className= {(activeEdit === e._id) ? `${styles.edit} ${styles.active}`: `${styles.edit}`}>
                                            <div><input value={newCosts.amount} onChange={newCostsHandler} name = "amount" placeholder={e.costs.amount} type="number"/></div>
                                            <div><input value={newCosts.category} onChange={newCostsHandler} name = "category" placeholder={e.costs.category} type="text"/></div>
                                            <div><button onClick={editB} value={e._id} className={styles.edit_ok_btn}>OK</button></div>
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                        <div className={styles.total}>
                            <div className={styles.total_w}>Total:</div>
                            <div>{total}$</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MainContent;
