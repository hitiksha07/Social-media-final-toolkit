import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { FaRegComment, FaRegCommentDots } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RxPaperPlane } from 'react-icons/rx';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { addCommentAction, deleteCommentApiData, editcommentApidata, getCommentApi } from '../../api/commentApi';

function Comment(props) {
    // console.log(props.comments)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [count, setcount] = useState(0);

    let dispatch = useDispatch();

    let user = JSON.parse(localStorage.getItem('account'));

    let blankObj = {
        id: 0, des: '', userId: '', postId: '', userEmail: ''
    }

    const [obj, setobj] = useState({ ...blankObj })
    const [obj1, setobj1] = useState({ ...blankObj})

    const getvalue = (e) => {
        obj[e.target.name] = e.target.value
        setobj({ ...obj })
    }
    const getvalue1 = (e) => {
        obj1[e.target.name] = e.target.value
        setobj1({ ...obj1 })
    }

    const handleShow = () => {
        dispatch(getCommentApi(props.postId))
        setShow(true)
    };
    const saveData = () => {
        console.log(props.comments.length)
        if (obj.id == 0) {
            let c = uuidv4()
            setcount(c);
            obj.id = c;
            obj.postId = props.postId;
            obj.userId = user.id;
            obj.userEmail = user.email;
            dispatch(addCommentAction(obj, props.postId));
        }

        // console.log(obj)
        setobj({ ...blankObj })
    }
    const saveData1 = () => {
        if (obj1.id != 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    // let i = props.comment?.findIndex(x => x.id == obj.id)
                    // console.log(i)
                    setcomm('');
                    dispatch(editcommentApidata(obj1, props.postId));
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    }
    const [comm, setcomm] = useState('')
    const editObj = (x, id) => {
        if (x.userId == user.id) {
            setobj1({ ...x });
            setcomm(id)
        }
    }
    const deleteComment = (id, x) => {
        if (x.userId == user.id || props.userId == user.id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteCommentApiData(props.postId, id))
                    // dispatch(getCommentApi(props.postId))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }
    }
    return (
        <>
            <FaRegCommentDots style={{ cursor: 'pointer' }} onClick={handleShow} />
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="form-floating mb-4 position-relative">
                        <input className="form-control" name='des' placeholder="Leave a comment here" value={obj.des} id="floatingTextarea" onChange={getvalue}></input>
                        <label htmlFor="floatingTextarea">Comments</label>
                        <RxPaperPlane className='position-absolute plane' onClick={saveData} />
                    </div>
                    <ul className='list-unstyled'>
                        {
                            props.comments?.map((x, i) => {
                                return <li key={i}>
                                    <figure>
                                        <blockquote className="blockquote d-flex justify-content-between">
                                            {
                                                x.userId == user.id ?
                                                    comm == x.id ?
                                                        <div className="form-floating mb-4 position-relative w-100">
                                                            <input className="form-control setting-inp w-100 rounded-0" name='des' value={obj1.des} placeholder="Leave a comment here" id="floatingTextarea" onChange={getvalue1}></input>
                                                            <RxPaperPlane className='position-absolute plane' onClick={saveData1} />
                                                        </div>
                                                        :
                                                        <p className=''>{x.des} </p>
                                                    : <><p className=''>{x.des} </p></>
                                            }
                                            <p>
                                                {
                                                    x.userId == user.id ?
                                                        comm == x.id ? <></> :
                                                            <AiFillEdit className='editPost' onClick={() => editObj(x, x.id)}></AiFillEdit> : <></>
                                                }
                                                {x.userId == user.id || props.userId == user.id ?
                                                    <RiDeleteBin6Fill className='editPost1 ms-2' onClick={() => deleteComment(x.id, x)}></RiDeleteBin6Fill> : <></>
                                                }
                                            </p>
                                        </blockquote>
                                        <figcaption className="blockquote-footer text-end">
                                            {x.userEmail}
                                        </figcaption>
                                        <hr />
                                    </figure>
                                </li>
                            })
                        }
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Comment