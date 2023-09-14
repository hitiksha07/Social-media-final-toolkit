import { postUser } from "../Store/Slice/UserSlice";
import axios from 'axios';

export const getPostApi = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/posts').then(res => {
            dispatch(postUser(res.data))
            console.log('post-get-api',res.data)
        })
    }
}
export const addPostApiData = (obj) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/posts',obj).then(res => {
            console.log('add',res.data)
            dispatch(getPostApi())
        })
    }
}
export const deletePostApiData = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/posts/${id}`).then(res => {
            console.log('delete',res.data)
            dispatch(getPostApi())
        })
    }
};
export const editPostApidata = (obj) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/posts/${obj.id}`, obj).then(res => {
            console.log(res.data)
            dispatch(getPostApi())
        })
    }
};
