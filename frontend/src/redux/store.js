import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {NotesReducer} from "./reducers/notesReducers"
import {composeWithDevTools} from "redux-devtools-extension"




const reducer = combineReducers({NotesReducer})
const  store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


export default store