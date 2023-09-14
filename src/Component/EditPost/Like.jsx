import React, { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { editPostApidata } from '../../api/postApi';

function Like(props) {
    // console.log(props.like)
    let user = JSON.parse(localStorage.getItem('account'))
    const [isActive, setisActive] = useState(props.like.includes(user.id) ? true : false);
    let post = useSelector(state => state.user.post);
    
    let LikePost = JSON.parse(JSON.stringify(post));
    // let LikePost = post
    let likeData = LikePost?.find(x => x.id == props.postId)
    let dispatch = useDispatch()
    function show() {
        if (!isActive) {
            setisActive(true);
            likeData?.like?.push(user.id);
            dispatch(editPostApidata(likeData))
        }
        else {
            let clg = likeData?.like?.filter(x => x != user.id)
            likeData.like = clg;
            dispatch(editPostApidata(likeData))
            setisActive(false)
        }
    }
    return (
        <>
            <span><AiFillHeart style={{
                cursor: 'pointer',
                color: isActive ? 'red' : '',
            }} onClick={show} /> </span><span className='position-relative'>{likeData?.like?.length}</span>
        </>
    )
}

export default Like