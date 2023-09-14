import axios from 'axios';
import { delecomm, getComment,editcomm } from '../Store/Slice/UserSlice';

export const getCommentApi = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3001/comments?postId=' + id).then(res => {
            // dispatch(getComment(res.data))
            dispatch(getComment([[...res.data], id]))
            console.log('comm res', res.data)
        })
    }
}
export const addCommentAction = (obj, postId) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/comments', obj).then(res => {
            // console.log('add',res.data)
            dispatch(getCommentApi(postId))
        })
    }
}

export const editcommentApidata = (obj, postId) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/comments/${obj.id}`, obj).then(res => {
            console.log('edit', res.data)
            // dispatch(getCommentApi(postId))
            dispatch(editcomm([res.data, postId, obj.id]))

        })
    }
};
export const deleteCommentApiData = (postId, id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/comments/${id}`).then(res => {
            console.log('delete', res.data)
            // dispatch(getCommentApi(postId))
            dispatch(delecomm([res.data, postId, id]))
           
        })
    }
};
