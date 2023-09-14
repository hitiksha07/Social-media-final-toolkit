import axios from "axios"
import { addUser, getUser } from "../Store/Slice/UserSlice"

export const getApidata = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:3001/users').then(res => {
            // console.log('res',res.data)
            dispatch(getUser(res.data))
        })
    }
}
export const addApiData = (obj) => {
    return async (dispatch) => {
         await axios.post('http://localhost:3001/users/',obj).then(res => {
            console.log('add',res.data)
            dispatch(getApidata())
        })
    }         
}
export const deleteApiData = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/users/${id}`).then(res => {
            console.log('delete',res.data)
            dispatch(getApidata())
        })
    }
};
export const editApidata = (obj) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/users/${obj.id}`, obj).then(res => {
            console.log(res.data)
            dispatch(getApidata())
        })
    }
};