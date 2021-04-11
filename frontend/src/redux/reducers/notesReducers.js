import {Constants} from "../constants/authConstance"



export const NotesReducer = (notes = [], action) => {
    switch (action.type) {
        case Constants.LOAD_NOTES:
            if (action.payload) {
                return notes = action.payload
            }
            return notes
        case Constants.CREATE_NOTE:
            return notes = [...notes, action.payload]
        case Constants.DELETE_NOTE:
            return notes.filter((notes) => notes._id !== action.payload)
        case Constants.PATCH_NOTE:
            const newA = [...notes]
            for(let key of newA){
                if(key._id === action.payload.noteID){
                    key.costs = action.payload.costs
                }
            }
            return newA
        default:
            return notes
    }
}