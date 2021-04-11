import {Constants} from "../constants/authConstance"
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min"
export const loadNotes = (info) => async (dispatch)=>{
    try {
        const {data} = await axios.get("/api/note/load", {params: info, headers: {Authorization : `Bearer ${info.token}`}})
        dispatch({type: Constants.LOAD_NOTES, payload: data})
    }catch (e) {
        console.log(e.message)
    }
}

export const createNote = (info) => async (dispatch)=>{
    try {
        const {data} = await axios.post("/api/note/create/entry", info, {headers: {Authorization : `Bearer ${info.token}`}})
        dispatch({type: Constants.CREATE_NOTE, payload: {year: info.year, month: info.month, day: info.day, costs: info.costs}})
        M.toast({html: "Note successfully created", classes: "rounded"})
    }catch (e) {
        M.toast({html: "Something went wrong", classes: "rounded"})
    }
}

export const deleteNote = (info) => async (dispatch)=>{
    try {
        await axios.delete("/api/note/delete",{
            headers: {
                Authorization: `Bearer ${info.token}`
            },
            data: {
                source: info
            }
        })
        dispatch({type: Constants.DELETE_NOTE, payload: info.noteID})
        window.M.toast({html: "Note successfully deleted", classes: "rounded"})

    } catch (e) {
        window.M.toast({html: "Something went wrong", classes: "rounded"})
    }
}

export const patchNote = (info) => async (dispatch)=>{
    try {
        const {data} = await axios.patch("/api/note/patch",{
            headers: {
                Authorization: `Bearer ${info.token}`
            },
            data: info
        })
        dispatch({type: Constants.PATCH_NOTE, payload: info})
        window.M.toast({html: "Note successfully changed", classes: "rounded"})

    } catch (e) {
        window.M.toast({html: "Something went wrong", classes: "rounded"})
    }
}


