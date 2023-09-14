import React, { useState } from 'react'
import { BsBookmarks, BsFillBookmarksFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { editPostApidata } from '../../api/postApi';
import Swal from 'sweetalert2';
import { editApidata } from '../../api/userApi';

function SavePost(props) {
    let user = JSON.parse(localStorage.getItem('account'))
    const [isActive, setisActive] = useState(user.save?.includes(props.postId) ? true : false);
    
    // let post = useSelector(state => state.user.post);
    // let saveData = JSON.parse(JSON.stringify(post));
    // let save1 = saveData?.find(x => x.id == props.postId)
    let dispatch = useDispatch()
    function show() {
        if (!isActive) {
            setisActive(true);
            console.log('save')
            user?.save?.push(props.postId);
            dispatch(editApidata(user))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Post has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            let clg = user?.save?.filter(x => x != props.postId)
            user.save = clg;
            dispatch(editApidata(user))
            setisActive(false)
            console.log('dont save')
        }
    }
    return (
        <>

            <BsBookmarks style={{
                cursor: 'pointer',
                // color: isActive ? '#D7BDE2' : '',
                display: isActive ? 'none' : 'block'
            }} onClick={show} />
            <BsFillBookmarksFill style={{
                cursor: 'pointer',
                // color: isActive ? '#D7BDE2' : '',
                display: isActive ? 'block' : 'none'
            }} onClick={show} />

        </>
    )
}

export default SavePost